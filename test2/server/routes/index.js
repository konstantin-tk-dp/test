import express from 'express';

import { createMessage, getMessages, getMessage, updateMessage, deleteMessage } from '../controllers/message.js';

const messageRouter = express.Router();

messageRouter.get('/', getMessages);

messageRouter.post('/', createMessage);

messageRouter.get('/:messageId', getMessage);

messageRouter.put('/:messageId', updateMessage);

messageRouter.delete('/:messageId', deleteMessage);

export default messageRouter;