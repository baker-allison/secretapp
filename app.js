//jshint esversion:8
const {passport, app, User} = require("./auth.js");


//configure home route
app.get("/", function(req, res){
  res.render("home");
});

//configure google auth route
app.get("/auth/google",
  passport.authenticate("google", {scope: ["profile"]})
);


//configure google callback route
app.get("/auth/google/secrets",
passport.authenticate("google", {failureRedirect: "/login"}),
function (req, res) {
  // sucessful authenticaton , redirect to secrets
  res.redirect("/secrets");
});




//configure login route
app.get("/login", function(req, res){
  res.render("login");
});

//configure register route
app.get("/register", function(req, res){
  res.render("register");
});

//configure secrets route
app.get("/secrets", function(req, res){

  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if(err){
      console.log(err);
    }else{
      if (foundUsers) {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    }
  });
});

//configure submit route
app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  }else{
    res.redirect("/login");
  }
});

// post submit request to database
app.post("/submit", function(req, res){
  const submittedSecret = req.body.secret;
  console.log(req.user);

  User.findById(req.user.id, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function(){
          res.redirect("/secrets");
        });
      }
    }
  });
});

//configure logout route
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//post register request  to database
app.post("/register", function(req, res){
User.register({username: req.body.username}, req.body.password, function(err, user){
  if (err) {
    console.log(err);
    res.redirect("/register");
  }else{
    passport.authenticate("local")(req, res, function(){
      res.redirect("secrets");
    });
  }
});


});
//post login request to database
app.post("/login", function(req, res){
  const user = new User({
    username:req.body.username,
    password:req.body.pasword
  });
  req.login(user, function(err){
    if (err) {
      console.log(err);
    }else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

});


app.listen(3000, function(req, res){
  console.log("Server running at port 3000");
});
