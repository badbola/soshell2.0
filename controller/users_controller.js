const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile', {
            title: 'Profile page',
            profile_user: user
        });
    })
}
module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success', 'Welcome to SoShell')
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    //res.cookie('soshell',0);
    req.logout();
    req.flash('success','Thankyou! Have a nice day');
    return res.redirect('/');
}
