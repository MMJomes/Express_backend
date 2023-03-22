const express = require('express')
const app = express();
const fs = require('fs')
const router = express.Router()
app.use('/photo', express.static('uploads'))
app.use('/', router)
router.get('/', (req, res) => {
    read_json_from_file = fs.readFileSync('data.json')
    data = JSON.parse(read_json_from_file)
    res.json(data)
})
module.exports = router
