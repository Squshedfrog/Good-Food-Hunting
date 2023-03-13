const { Client } = require('pg');

const bcrypt = require('bcrypt');


const db = new Client({
    database: 'goodfoodhunting',
})
db.connect()

const email = 'sim'
const myPlaintextPassword = "123"



bcrypt.genSalt(10, (err , salt) => {

    bcrypt.hash(myPlaintextPassword, salt, (err, digestedPassword) => {
        // the digested password is what w want to save in db
       console.log(digestedPassword);
    
    
    
    const sql = `
    INSERT INTO users (email, password_digest)
    VALUES ('${email}', '${digestedPassword}');`
    console.log(sql);

    
    db.query(sql, (err , dbRes) => {
        console.log(err)
        db.end()
    }) 
    })
})