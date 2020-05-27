const express = require('express');
const app = express();
const port= 8000;

app.listen(port, function(err){
    if(err){ console.log(`Erro in connectinf ${port} due to ${err} error`);}

    console.log(`Server is running onn port ${port}`);

});