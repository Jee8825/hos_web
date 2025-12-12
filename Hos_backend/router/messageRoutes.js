const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

router.get('/', messageController.getAllMessages);
router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
