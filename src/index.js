const { response, request } = require('express');
const express = require('express');

const { v4: uuidv4 } = require('uuid')

const app = express();


//Middleware é a validação


const customers = [];
//Utilizar esse app.use para dizer vai utilizar dos envios com formato JSON
//MIDDLEWARE PARA RECEBER EM JSON
app.use(express.json());

/**
 * cpf = string.format
 * name = string.format
 * id = uuid
 * statement []
 */

//Middleware

function veriftIfExistsAccountCPF(request,response, next){
  
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);
   
    if(!customer){
        return response.status(400).json({error: "Customer Not found"});
    }

    //Para passar os valores da middleware para as rotas, criar o objeto que vai dosponibilzar os valores
    request.customer = customer;

    return next();

}

function getBalance(statement){

    const balance = statement.reduce((acc,operation) =>{

        if(operation.type === 'credit'){
            return acc+ operation.amount;

        }else{

            return acc - operation.amount;
        }
    }, 0);

    return balance;
}


app.post('/account' , (request , response)=>{
    const {cpf, name} = request.body;
    const id = uuidv4();

    //utilizar some apenas para validação true or false
    const customersAlreadyExist = customers.some((customer) => customer.cpf === cpf);

    if(customersAlreadyExist){
        return response.status(400).json({error: "Customer already exists!"});
    }

    customers.push(
        {
            cpf,
            name,
            id: uuidv4(),
            statement: []
        }
    );

    return response.status(201).send();
});

// app.use(veriftIfExistsAccountCPF);
//para utilizar a middleware incluir a middleware no centro  da roteirização
app.get('/statement', veriftIfExistsAccountCPF ,(request, response) => {

    const { customer } = request;

    return response.json(customer.statement);
});

app.post('/deposit', veriftIfExistsAccountCPF, (request,response)=> {

    const {description, amount} = request.body;

    const {customer} = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();


});

app.post('/withdraw', veriftIfExistsAccountCPF, (request,response) => {

   const { amount } = request.body;
   const { customer } = request;

   const balance = getBalance(customer.statement);
   console.log(balance);

   if(balance < amount) {
       return response.status(400).json({error: "Amount more than u have"});
   }

   const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
}

customer.statement.push(statementOperation);
return response.status(201).send();

});

app.listen(3333);