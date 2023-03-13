const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const pg = require('pg')
const Pool = pg.Pool

const client = new Pool({
    database: "goodfoodhunting",
})

router.get('/sessions', (req , res) => {
    res.render('login')
    
})

router.post('/sessions', ( req, res ) => {
    //console.log(req.session)
    

    const email = req.body.email
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE email = '${email}';`

    client.query(sql, (err, dbRes) => {
        if ( dbRes.rows.length === 0 ){
            // no good user dosen't exist
            //console.log(dbRes.rows, password, email)
            
            // user not found
            res.redirect('/sessions')
            return
        }   
        

        const user = dbRes.rows[0]

        bcrypt.compare(password, dbRes.rows[0].password_digest, (err ,result) => {
            
            if (result) {
                //logged in
                req.session.userId = user.id
                req.session.email = user.email
                res.redirect('/')

            } else {
                //incorrect password
                res.redirect('/sessions')
            }
        })
        
       
    })
    
    
    
    //res.json(req.body);
})

router.delete('/sessions', (req ,res) => {
    req.session.destroy( function (){
        res.redirect('/sessions')
    } )
})



module.exports = router