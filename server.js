
const express = require('express');
const app = express();
const port = 3015;
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine','ejs');
app.get('/', (req, res) => {
    res.render('index');
})
//midware///
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'miClave12345',
    resave: true,
    saveUninitialized: true
}))
app.use('/',require('./router'))

//////



app.get('/home_main', (req, res) => {
  	res.send('Aqui se muestra los crud usuarios')
})


app.post('/', (req, res) => {
    let numeros = req.body.listaNumero;
    let txt =  req.body.texto;
    const sms = require('./index');
    for (let i = 0; i < numeros.length; i++) {
        let numero = numeros[i];
        setTimeout(function(){
            sms.enviarSMS(txt,numero); 
            // console.log(numero);
        },i * 2000)
    }

    
    // numeros.forEach(numero => {
    //     sms.enviarSMS(txt,numero);  

    // });
    res.send(req.body);
})

app.listen(port, () => {
  	console.log(`Example app listening at http://localhost:${port}`)
})

