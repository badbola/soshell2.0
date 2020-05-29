module.exports.home = function(req, res){
    //res.cookie('stark', 21);
    //console.log(req.cookies);
    return res.render('home', {
        title: 'Soshell Homepage'
    });
}