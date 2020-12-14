const express = require('express');
const routes = require('./routes');



const app = express();

app.use(routes);

app.listen(5001,()=>{
    console.log('run on server')
});