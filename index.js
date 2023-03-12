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

async function run() {
     try {
          const productCollection = client.db("ema_john").collection('products');

          // get all  product api 
          app.get('/products', async (req, res) => {
               const page = req.query.page;
               const size = req.query.size;
               console.log({ page, size })
               const query = {};
               const cursor = productCollection.find(query);
               const products = await cursor.toArray();
               const count = await productCollection.estimatedDocumentCount();
               res.send({ count, products });
          });
     } finally {

     }
}
run().catch(err => console.log(console.error(err)));

//Home Route
app.get('/', (req, res) => {
     res.send('ema john server is running')
});

// listening port
app.listen(port, () => {
     console.log(`ema john server running on : ${port}`);
});