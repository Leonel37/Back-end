var express = require('express');
var router = express.Router();
const productModel = require ('../models/producto');

//Listar
router.get('/', async function(req, res, next) {
  const resultado = await productModel.find();
  res.json(resultado);
});

//Agregar 
router.post('/', async function(req, res, next) {
  let datos = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    images: req.body.images
  };

  let product = new productModel(datos);
  let resultado = await product.save();

  res.json('Registro agregado exitosamente');
});


//Editar 
router.put('/', async function(req, res, next) {

  const filter = {id: req.query.id}; 
  const update = {name: req.query.name,
    description: req.query.description,
    price: req.query.price,
    stock: req.query.stock,}; 

  const resultado = await productModel.findOneAndUpdate(filter, update,
    {new : true,
    upsert : true});

  res.json('Se actualizo el Producto');
});

//Eliminar
router.delete('/:id', async function(req, res, next) {

  //Buscar un producto por ID y regresa una lista
  const resul = await productModel.find({id: req.params.id}).exec();

  //Si se encontrĂ³ lo elimina
  if (resul.length > 0) { await productModel.deleteOne({id: req.params.id});
    res.json("Eliminando producto");
  } else {
    res.json({error: "No se encontrĂ³ el producto con Id " + req.params.id})
  }

});


module.exports = router;
