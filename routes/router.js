const router = require('express').Router()
const Controller = require('../controller/controller')

router.get('/', Controller.getUsers)
router.post('/', Controller.transaction)
router.get('/histories', Controller.getHistories)

module.exports = router