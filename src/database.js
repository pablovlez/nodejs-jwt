const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejwt', {
    useNewUrlParser: true, 
    useUnifiedTopology:true
}).then(db => console.log("Conected to db nodejwt"));




