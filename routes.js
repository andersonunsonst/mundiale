const express = require('express')
const crawlerController = require('./src/controllers/crawler-controller');
 
const routes = express.Router()

routes.get("/", (req, res) => {
    return res.json({message: "This API is working!"});
});

routes.post('/search', crawlerController.search);

module.exports = routes;