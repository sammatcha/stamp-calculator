const express = require('express');
//create an express app
const app = express()
//define port
const port = 3001;
const cors = require ('cors');
const routes = require('./routes/usps')

app.use(cors());
app.use(express.json())

app.use('/api', routes)
// app is listening to port
app.listen(port, () => {
})