const express = require('express');

const app = express();

//Utilizar esse app.use para dizer vai utilizar dos envios com formato JSON
app.use(express.json());

/**
 * GET - Buscar informação 
 * POST - Inserir informação
 * PUT - Atualizar informação
 * Patch - Atualizar informação especifica
 * DELETE - Deletar
 */

/**
 * Tipos de parametros
 * 
 * Route Params => Identificar um recurso para editar ,deletar ou buscar (passar id :id) OBRIGATORIO
 * Query Params => Paginação / Filtro (?page=1&order=asc) OPCIONAL
 * Body Params => Os objetos inserção/alteração (JSON)
 */

app.get('/courses', (request, response) => {

    const query = request.query;
    console.log(query);
    return response.json(['curso 1', 'curso 2', 'curso 3']);

});

app.post('/courses', (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(['curso 1', 'curso 2', 'curso 3', 'curso 4']);
});

app.put('/courses/:id', (request, response) => {
    const params = request.params;
    console.log(params);
    return response.json(['curso 6', 'curso 2', 'curso 3', 'curso 4']);

});

app.patch('/courses/:id', (request, response) => {
    return response.json(['curso 6', 'curso 2', 'curso 3', 'curso 4']);

});

app.delete('/courses/:id', (request, response)=>{
    return response.json(['curso 6', 'curso 2', 'curso 4']);
});

app.listen(3333);