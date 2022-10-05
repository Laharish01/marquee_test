const express = require('express')
const router = express.Router()
const db = require('../database/queries')
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

router.get('/', db.getCompanies);

router.post('/', db.createCompany);

router.delete('/', db.deleteCompany);

router.post('/search', (req, res) => {
    var reqString = "search=" + req.body.search + "&filter=company";
    console.log(reqString);

    var list = (async () => {
        const rawResponse = await fetch("https://www.zaubacorp.com/custom-search", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: reqString
        });
        var content = await rawResponse.text();
        var result = []

        const root = parse(content)
        var nodeList = root.querySelectorAll(".show");
        [].forEach.call(nodeList, (node) => {
            const obj = {
                cin: node.id,
                name: node.innerHTML
            }
            result.push(obj)
        })
        return result;
    })();

    list.then(data => {
        res.status(200).send(data);
    })
})

module.exports = router