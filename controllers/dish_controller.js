const express = require('express')
const router = express.Router()
const ensuredLoggedIn = require('./../middlewares/ensure_logged_in')
const client = require('../db')


router.get("/", ( req, res ) => {
   console.log(req.user);
    const sql = "SELECT * FROM dishes order by id asc;"

    client.query(sql, (err , dbRes ) => {
        
        const dishes = dbRes.rows;
   
        res.render("home", {dishes : dishes })
    })
})

router.get("/dishdetails", ensuredLoggedIn, ( req , res ) => {

    let dishId = req.query.dishid;
    const dishReq = `SELECT * FROM dishes WHERE id=${dishId};`;
    client.query(dishReq, (err , dbRes ) => {
        
        const dish = dbRes.rows;
       // console.log(dish);
        
        res.render("details",{dish : dish});
    })
})

// router.get("/dishes/:food", ( req , res ) =>{
//     client.query('SELECT * FROM dishes WHERE id=')
//     res.render("dish_details", )
// })

// routes is the http method and the path

router.get ('/dishes/new', (req, res) => {
    if ( !req.session.userId){
        res.render('login')
        return
    }
    res.render('new_dish');
})
router.post('/dishes', ( req,res ) => {
    //console.log(req.body.title);
    //console.log(req.body.image_url);
    //console.log(req.query.title);
    const sql = `INSERT INTO dishes (title, image_url,user_id) VALUES ('${req.body.title}' , '${req.body.image_url}' , ${req.session.userId});`; //res.locals.currentUser.id
    console.log(sql);
    client.query(sql, (err, dbRes) => {
        res.redirect('/');
    })
})

router.get('/edit_dish/:id', (req , res) => {
    // fetch the record for this dish
    // for use in the form
    const sql = `SELECT * FROM dishes WHERE id=${req.params.id}`
    client.query(sql, (err, dbRes) => {
        if (err){
            console.log(err)
        } else {
            const dish = dbRes.rows[0]
            res.render('edit_dish', {dish : dish});
        }
    })  
    
})

router.put('/edit', ( req ,res ) => {
    let dish = req.body
    // console.log(dish);
    const sql = `UPDATE dishes SET title='${dish.title}', image_url='${dish.image_url}'  WHERE id=${dish.id}`
    console.log(sql)
    client.query(sql, (err, dbRes) => {
        res.redirect('/');
    })
})

router.delete('/delete_dish', (req , res) => {
    // delete from dishes where id=#;
    let idReq = (req.body.id);
    const sql = `DELETE FROM dishes WHERE id = ${idReq};`;
    client.query(sql, (err, dbRes) => {
        res.redirect('/');
    })
})


module.exports = router