const connection = require('./conn');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', function(req, res){
    connection.query('select * from availmoney where user_id=?',[1], (err, mdata)=>{
        if(err){
            throw err;
        }
        else{
            connection.query('select * from exp order by id desc',(err, data)=>{
                if(err){
                    throw err;
                }
                else{
                    res.render("home", {avail:mdata, thirty:data});
                }
            })
        }
    })
    
});

app.get('/add', function(req,res){
    res.render("add");
});

app.post('/add', (req, res)=> {
    const day = req.body.day;
    const title = req.body.title;
    const spend = req.body.spend;
    connection.query('insert into exp(day, title, spend, user_id) values(?,?,?,?)',[day, title, spend, 1], (err, result)=>{
        if(err){
            throw err;
        }
        else{
            connection.query('update availmoney set available=available-?',[spend],(err,result)=>{
                res.redirect("/");
            });
        }
    })
})

app.get('/profile', (req, res)=>{
    connection.query('select * from users where user_id=?',[1],(err, data)=>{
        if(err){
            throw err;
        }
        else{
            // console.log(data);
            res.render("profile", {udata:data});
        }
    })
    
});

app.get('/addMoney', (req, res)=>{
    
    res.render("addMoney");
});

app.post('/addMoney', (req, res)=> {
    const money = req.body.money;
    connection.query('update availmoney set available=available+?',[money],(err, result)=>{
        if(err){
            throw err;
        }
        else{
            res.redirect("/");
        }
    })
})

app.get('/all', (req, res)=>{
    connection.query('select * from exp order by id desc', (err, data)=>{
        if(err){
            throw err;
        }
        else{
            connection.query('select sum(spend) as totalSpend from exp', (err, tdata)=>{
                if(err){
                    throw err;
                }
                else{
                    // console.log(tdata);
                    res.render("all", {thirty:data, allSpend: tdata});
                }
            })
            
        }
    })
});

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
});