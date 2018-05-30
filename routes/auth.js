const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) return next();
  res.status(403).json({message: 'No existes'});
  
}

router.get('/logout', (req, res, next)=>{
  req.logOut();
  res.status(200);
  res.json({message: 'Vuelve Pronto!'});
});

router.get('/profile', (req, res, next)=>{
  User.findById(req.user._id)
  .then(user=>{
    res.json(user);
    res.json({message: 'Bienvenido' + req.user.firstName})
  })

  .catch(e=>next(e))
});

router.post('/login',
 passport.authenticate('local'), 
 (req, res, next)=>{
  return res.json(req.user);
});

router.post('/signup', (req, res, next)=>{
  console.log(req.body);
  User.register(req.body, req.body.password, (err, user)=>{
    if(err) return res.json(err);
    res.json(user);
  })
});








module.exports  = router;
