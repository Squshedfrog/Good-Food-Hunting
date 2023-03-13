const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const client = require('../db')


/*

router.get('/users')            // list of users
router.post('/users')           // create a user
router.delete('/users/:id')     // delete a user
router.put('/users/:id')        // update single user
router.get('/users/new')        // get new user form
router.get('/users/:id/edit')   // get existing user form
router.get('/users/:id')        // get single user

*/

router.get('/users', (req , res ) => {
    res.render('sign_up')
})

router.post('/users/new', ( req , res ) => {
    const email = req.body.email
    const myPlaintextPassword = req.body.password

    bcrypt.genSalt(10, (err , salt) => {

        bcrypt.hash(myPlaintextPassword, salt, (err, digestedPassword) => {
            
            
           
        
            const sql = `
            INSERT INTO users (email, password_digest)
            VALUES ('${email}', '${digestedPassword}');`
            //console.log(res.locals);
    
            
            client.query(sql, (err , dbRes) => {
            console.log(err)
            
            }) 


        })
    })

    res.render('login')
})

router.get('/users/login', ( req , res ) => {
/*
    const sql = `SELECT * FROM users WHERE email = '${res.locals.currentUser.email}';`
    console.log(sql);
    client.query(sql, (err, dbRes) => {
        //console.log(dbRes)
        const user = dbRes.rows[0]
        
        res.redirect('/')
    })

*/

})  




module.exports = router