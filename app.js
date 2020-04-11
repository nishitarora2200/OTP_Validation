const express = require('express');
const app = express();
const ejs = require('ejs');
const sequelize = require('./utils/database');
const Customer = require('./Models/customers');

const bodyParser = require('body-parser');
const router  = require('./routes/customer');
app.set('view engine','ejs');
app.set('views','views');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(router);

sequelize.sync().then(resp=>{
    app.listen(3000,()=>console.log("server is listening"));
}).catch(err=>{
    console.log(err);
})




