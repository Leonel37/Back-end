var express = require('express');
var router = express.Router();
const usersModel = require ('../models/usuarios');


//Listar
router.get('/', async function(req, res, next) {
    const resultado = await usersModel.find();
    res.json(resultado);
  });


  

  //Agregar 
router.post('/', async function(req, res, next) {
    let datos = {
      id: req.body.id,
      name: req.body.name,
      password: req.body.password
    };
  
    let users = new usersModel(datos);
    let resultado = await users.save();
  
    res.json('Registro agregado exitosamente');
  });
  

//Editar 
router.put('/', async function(req, res, next) {

  const filter = {id: req.body.id}; 
  const update = {name: req.body.name, password: req.body.password};

  console.log(update)

  const resultado = await usersModel.findOneAndUpdate(filter, update,
    {new : true,
    upsert : true});

  res.json('Se actualizo el el usuario');
});




//Eliminar
router.delete('/:id', async function(req, res, next) {

  //Buscar un producto por ID y regresa una lista
  const resul = await usersModel.find({id: req.params.id}).exec();

  //Si se encontró lo elimina
  if (resul.length > 0) { await usersModel.deleteOne({id: req.params.id});
    res.json("Eliminando cliente");
  } else {
    res.json({error: "No se encontró el producto con Id " + req.params.id})
  }

});



module.exports = router;
