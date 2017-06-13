const router = require('express').Router()
const hC = require('../controllers/house_controller')

router.get('/', (req, res) => {
  res.send('hai')
})

router.post('/house', hC.insert)
router.get('/house', hC.getAll)
router.get('/house/:id', hC.getById)
router.put('/house/:id', hC.updateById)
router.delete('/house/:id', hC.deleteById)

module.exports = router
