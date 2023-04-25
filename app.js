const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



//connect to database
app.use(cors({origin: true, credentials: true}));
app.use(express.json({extended: false}));

const conn_str = "mongodb+srv://CJRemley:CJRemleyMOngoDB@webproj.8moffzk.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(conn_str, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})
.then(() => {
    app.listen(port)
    console.log('MongoDB connection succeeded')
})
.catch( err => {
    const x = 10;
    console.log(`Error in DB Connection${err}`);
});



const user = require("./routes/user");
app.use('/routes/user/', user);



app.get('/', (req, res) => res.send('Hello world!'));
/*
const Item = require('./models/User');
app.post('/', (req,res) => {
    Item.create(req.body)
        .then((item) => res.json({msg: 'Item Added successfully'}))
        .catch((err) => res.status(400).json({error: 'Unable To Add This Item'}));
});

*/




