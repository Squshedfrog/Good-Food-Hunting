const client = require('./../db')


function setCurrentUser(req, res , next )  {
    
    const { userId } = req.session
    res.locals.currentUser = {}
    
    if ( userId ) {
      const sql = `select id, email from users where id = ${userId}`
  
      client.query(sql, (err, dbRes) => {
        if (err) {
          console.log(err)
        } else {
          res.locals.currentUser = dbRes.rows[0]
          //console.log(res.locals.currentUser)
          next()
        }
      })
    } else {
        next()
    }
      
}

module.exports = setCurrentUser;