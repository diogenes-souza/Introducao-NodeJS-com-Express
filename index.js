const express = require('express');
const bodyParser = require('body-Parser');

const res = require('express/lib/response');

const server = '127.0.0.1'
const port = '8000'

const app = express();
const userRoute = require('./routes/userRoute')

//Utilizado com a importação do bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

//Utilizado com a importação do userRoute (arquivo)
userRoute(app)


/*
Sintaxe do app.listen

app.listen([port], [host], [backlog], [callback])

http://127.0.0.1:8000
*/

app.get('/', function(req, res) {
    res.send('Olá Mundo em Node e Express')
} )

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
  })