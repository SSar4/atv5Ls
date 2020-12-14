const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const data = require('../data.json');
const multer = require('./middlewares/multer');
const routes = express();
routes.use(express.json())
routes.use(express.static('public'))
routes.use(express.urlencoded({extended:true}));

routes.set('view engine','html')
nunjucks.configure(__dirname + '/views',{express:routes})
 
routes.get('/',(req,res)=>{
  return res.render('products');
});
routes.post('/products', multer.array('photos',6), (req, res) =>{
    const dados = req.body;
    const chaves = Object.keys(dados);
    for(chave of chaves){
      if(dados[chave]==""){
        res.send('coloque 1')
      }
    }
    const arquivos = req.files;
    console.log(arquivos);
    if(arquivos.length == 0){
      return res.send('coloque uma')
    }
    const {name,description} = dados;
    let filePaths = [];
    arquivos.forEach(file=>{
      const {path} = file;
      filePaths.push(path)
    });
    data.products.push({
      name,
      description,
      filePaths
    });
    fs.writeFile('data.json',JSON.stringify(data,null,2), (error)=>{
      if(error){ return res.send('erro ao salvar')}
    })
    return res.redirect('/')
  });
  
  module.exports = routes;