const express = require('express');
// const session = require('express-session');

const router = express.Router();



const { getPool } = require('./model/conexion');

// router.get('/home_usuario', (req, res)=>{
//     res.send('Hola ');
// })

router.get('/home_usuario', async (req, res, next) => {
    getPool().query('SELECT * FROM cliente', (err, respuesta) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        console.log(respuesta.rows);
        return res.send(respuesta.rows);
    });
});

router.post('/verificarUsuario',async (req, res, next)=>{
    let {login,pass} = req.body;
    // console.log(login);
    // console.log(pass);
    getPool().query('SELECT * FROM cliente WHERE correo_cliente = $1 AND pass_cliente = $2 ',[login,pass], (err, respuesta) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }else{
            let myResp;
            if(respuesta.rows.length === 0) {
                myResp = {'respuesta': 0};
                // res.status(200).json(myResp);
                res.status(200).json(myResp);
            }else{
                myResp =  respuesta.rows[0];
                // res.status(200).json(myResp);
                // res.send('usuario');
                res.render('usuario.ejs',{myResp});
            }
            // res.status(200).json(myResp);
            // res.render('/usuario');
            
        }
    });
})
router.get('/index', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/preguntas', (req, res) => {
    res.render('preguntas');
})

router.get('/nosotros', (req, res) => {
    res.render('nosotros');
})

router.get('/mensajes', (req, res) => {
    res.render('mensajes');
})

router.get('/detalles', (req, res) => {
    res.render('detalles');
})

// router.get('/home_usuario',(req,res) =>{
//     if(req.session.nombreUsuario == "" && req.session.pass == ""){
//         res.render('index');
//     }else{
//         res.render('home_usuario');
//     }
// })

router.post('/fm_crear_usuario',async(req, res, next)=>{
    let {nombreUsuario,correoUsuario,celularUsuario,pass} = req.body;
    getPool().query("INSERT INTO cliente(correo_cliente, nombre_cliente, pass_cliente, nro_cliente, cant_sms) VALUES ($1, $2, $3, $4, $5) RETURNING id_cliente",
    [correoUsuario,nombreUsuario,pass,celularUsuario,0],(err, respuesta) => {
        if (err) {
            console.log(err);
            req.session.nombreUsuario = "";
            req.session.pass = "";
            return res.send(err);
        }else{
            // let idCliente = respuesta[0].id_cliente;
            req.session.nombreUsuario = nombreUsuario;
            req.session.pass = pass;
            console.log(respuesta);
            res.render('home_usuario',{nombreUsuario, pass});
            // res.status(200).json(respuesta);
            // let myResp;
            // if(respuesta.rows.length === 0) {
            //     myResp = {'respuesta': 0};
            //     res.status(200).json(myResp);
            // }else{
            //     myResp =  respuesta.rows[0];
            //     res.render('usuario.ejs',{myResp});
            // }
        }
    });
});


module.exports = router;