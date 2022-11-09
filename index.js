const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ycsbxjs.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
;

async function run() {
    try {
        const serviceCollection = client.db('photoholic').collection('serviceCollection')

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {

    }
}
run().catch(error => {
    console.error('Error: ', error.message, error.stack, error);
})

app.get('/', (req, res) => {
    res.send('Server running')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})