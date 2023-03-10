const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
//PORT DEFINE
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@hello-developer.eiztv73.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     serverApi: ServerApiVersion.v1
});
client.connect(err => {
     const collection = client.db("test").collection("devices");
     // perform actions on the collection object
     client.close();
});



app.get('/', (req, res) => {
     res.send('ema john server is running')
})

app.listen(port, () => {
     console.log(`ema john server running on : ${port}`);
})