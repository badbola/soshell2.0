const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port= 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session =require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
//make the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('views', './view');

app.use(session({
    name: 'soshell',
    secret: 'silence',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disables'
        },
        function(err){
            console.log(err || 'connect-mongo db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){ console.log(`Error in connectinf ${port} due to ${err} error`);}

    console.log(`Server is running onn port ${port}`);

});