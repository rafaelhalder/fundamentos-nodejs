import http from 'node:http'
import { Transform } from 'node:stream';

class ReverseNumber extends Transform {
  _transform(chunk,encoding,callback){

    
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    callback(null,Buffer.from(String(transformed)));

  }

}

const server = http.createServer( async (req,res) => {
 
 const buffers = []
 for await (const chunk of req){
  buffers.push(chunk)
 }

 const fullBodyContent = Buffer.concat(buffers).toString()
 console.log(fullBodyContent)
 return res.end(fullBodyContent)
  // return req.pipe(new ReverseNumber())
 // .pipe(res)
})

server.listen(3334)