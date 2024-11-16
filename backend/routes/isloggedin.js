const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
  res.send(req.ocid.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router