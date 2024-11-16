const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated());
});

module.exports = router