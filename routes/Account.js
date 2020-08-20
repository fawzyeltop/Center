const express = require('express');
const router = express.Router();

// Include Controllers(Account_Controller + Upload)
const Account_Controller = require('../Controllers/Account');
const Upload = require('../Controllers/Upload');

// Include checkAuth Middleware
const checkAuth = require('../Middlewares/checkAuth')


// Signup Router => Post to /user/signup to execute this request
router.post('/signup', Account_Controller.Signup)

// Login Router => Post to /user/login to execute this request
router.post('/login', Account_Controller.Login)

// Login Router => Post to /user/login to execute this request
router.post('/uploadPicture', checkAuth, Upload.uploadPicture)

// Login Router => Post to /user/login to execute this request
router.put('/editProfile', checkAuth, Account_Controller.editProfile)

// RemoveUser Router => Post to /user/removeUser to execute this request
router.post('/changePassword', checkAuth, Account_Controller.changePassword)

// RemoveUser Router => Post to /user/logout to execute this request
router.post('/logout', checkAuth, Account_Controller.Logout)

// RemoveUser Router => Post to /user/removeUser to execute this request
router.delete('/removeUser', checkAuth, Account_Controller.RemoveUser)






//     router.post('/forgotPassword', (req, res, next) => {

//       async.waterfall([
    
//         function (done) {
//           crypto.randomBytes(20, (err, buf) => {
//             var token = buf.toString('hex');
//             done(err, token);
//           });
//         },
    
//         function (token, done) {
//           User.findOne({ email: req.body.emailForgot }, function (err, user) {
//             if(err) {
//               req.flash('error', `Home ${ err.message }`);
//               res.redirect('/');
//             }
//             if (!user) {
//               req.flash('error', 'Forgot No account with that email address exists');
//               res.redirect('/');
//             } else {
//               user.resetPasswordToken = token;
//               user.resetPasswordExpires = Date.now() + 3600000;
//               user.save(function (err) {
//                 done(err, token, user);
//               });
//             }
//           });
//         },
    
//         function (token, user, done) {
//           let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'AbdulrahmanFawzy999@gmail.com',
//               pass: 'sxgqljelmksfsuuo'
//             }
//           });
//           let mailOptions = {
//             to: user.email,
//             from: 'AbdulrahmanFawzy999@gmail.com',
//             subject: 'Reset your password',
//             html: `
//                   <p> You are receiving this because you (or someone else) has requested the reset of the password for your account. 
//                   </p>
//                   <p>
//                   Please click on the following link to complete the process
//                   </p>
//                   <a href= "http://localhost:3000/user/reset/${ user._id }/${ token }">Follow</a>
//                   <p>If you did not request this, please ignore this email and your password will remain unchanged. </p>`
//           };
//           transporter.sendMail(mailOptions, function (err) {
//             if(err) {
//               req.flash('error', `Home ${ err.message }`);
//               res.redirect('/');
//             }
//             req.flash('success', 'Home An e-mail has been sent to ' + user.email + ' with further instructions.');
//             done(err, 'done');
//           });
//         }
//       ], function (err) {
//         if (err) return next(err);
//         res.redirect('/');
//       });
//     });
// router.get('/reset/:id/:token', (req, res, next) => {
//     User.findOne({ _id: req.params.id, resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
//       if (err) {
//         req.flash("error", `Home ${ err.message }`);
//         res.redirect("/");
//       }
//       if (user) {
//         req.flash("success", `resetPassword ${ req.params.id } ${ req.params.token } `);
//         res.redirect("/");
//       }
//       else {
//         req.flash("error", "Home Something wrong happened");
//         res.redirect("/");
//       }
//     });
//   });
  
// router.post('/updatePassword', (req, res, next) => {
//   User.findOne({ _id: req.body.userID, resetPasswordToken: req.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
//     if (err) {
//       console.log(err.message);
//       req.flash("error", `Home ${ err.message }`);
//       res.redirect("/");
//     }
//     if (!user) {
//       req.flash("error", `Home Something went wrong`);
//       res.redirect("/");
//     }
//     else {
//       if (req.body.password.trim().length === 0 || req.body.confirmPassword.trim().length === 0) {
//         req.flash("error", "resetPassword fill out all fields");
//         req.flash("success", `resetPassword ${ req.body.userID } ${ req.body.resetPasswordToken } `);
//         res.redirect("/");
//       }
//       else if (req.body.password != req.body.confirmPassword) {
//         req.flash('error', 'resetPassword Two passwords are not matched');
//         req.flash("success", `resetPassword ${ req.body.userID } ${ req.body.resetPasswordToken } `);
//         res.redirect("/");
//       } else {
//         bcrypt.genSalt(10, (err, salt) => {
//           if (err) {
//             console.log(err.message);
//             req.flash("error", `Home ${ err.message }`);
//             res.redirect("/");
//           }
//           bcrypt.hash(req.body.password, salt, (err, hash) => {
//             if (err) {
//               console.log(err.message);
//               req.flash("error", `Home ${ err.message }`);
//               res.redirect("/");
//             }
//             user.password = hash;
//             user.resetPasswordToken = undefined;
//             user.resetPasswordExpires = undefined;
//             user.save()
//               .then((Doc) => {
//                 req.flash('success', `Home Welcome ${ Doc.fullname} Your password has been changed`);
//                 res.redirect('/');
//               })
//               .catch((err) => {
//                 console.log(err.message);
//                 req.flash("error", `Home ${ err.message }`);
//                 res.redirect("/");
//               })
//           });
//         });
//       }
//     }
//   });
// });
module.exports = router;