const User = require('../model/user');

module.exports.profile = function(req,res){
    return res.render('profile', {
        title: 'Profile page'
    });
}

module.exports.signup = function(req,res){
    return res.render('user_signup',{
        title: 'Soshell | Signup'
    })
}

module.exports.signin = function(req,res){
    return res.render('user_signin',{
        title: 'Soshell | Signin'
    })
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('Error in signing up'); return; }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){ console.log('Error in signing up'); return; }

                return res.redirect('/users/signin');
            })
        }else{
           return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req,res){
    //todo later
}