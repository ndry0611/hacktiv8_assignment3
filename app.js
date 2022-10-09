const cors = require('cors');
const express = require('express');
const router = require('./routers');
const jwt = require('./helper/jwt');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);

// app.listen(PORT, () => {
//     console.log(`Running at http://localhost:${PORT}`);
// });

module.exports = app;