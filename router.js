const express = require('express');
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

router.get('/login', (req, res) => {
    res.render('login');
})


module.exports = router;