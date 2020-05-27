const express = require('express');
const app = express();
const port= 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './view');

app.listen(port, function(err){
    if(err){ console.log(`Error in connectinf ${port} due to ${err} error`);}

    console.log(`Server is running onn port ${port}`);

});