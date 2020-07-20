const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
const { check, validationResult } = require('express-validator');
router.post('/signup', [
    check('fullname').isLength({ min: 6 }).withMessage('Fullname should be more than 6 chars'),
    check("email").isEmail().withMessage("Email must be correct"),
    check('password').isLength({ min: 6 }).withMessage('Password shoud be more than 6 chars'),
    check('phone').isLength({ min: 11, max: 11 }).withMessage('Phonenumber must be 11 chars').isNumeric().withMessage("Phone must be number only")
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {    
        req.flash('errors', errors.array());
        res.redirect('/');
    } else {
        passport.authenticate('local.signup', {
            successRedirect: '/profile',
            failureRedirect: '/',
            failureFlash: true
        })(req, res);
    }
});
router.post('/login', (req, res, next) => {
      passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
      })(req, res);
  });
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
  router.get('/auth/facebook',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));
module.exports = router;