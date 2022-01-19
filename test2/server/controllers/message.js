import Pusher from 'pusher';
import pkg from 'dotenv';

import { createSingleMessage, getAllMessages, getSingleMessage, updateSingleMessage, getSingleMessageAndRemove } from '../services/service.js';

pkg.config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'eu',
    useTLS: true
});
const channel = 'events';

const createMessage = async (req, res, next) => {
    const content = req.body.content;

    try {
        const changedAt = Date.now();
        const action = 'created';

        const result = await createSingleMessage({ content, changedAt, action });
        pusher.trigger(channel, 'created', result);

        res.status(201).json(result);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const message = await getAllMessages();

        res.status(201).json(message);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const getMessage = async (req, res, next) => {
    const messageId = req.params.messageId;

    try {
        const message = await getSingleMessage(messageId);
        if (!message) {
            const error = new Error('Could not find message');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json(message);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const updateMessage = async (req, res, next) => {
    const messageId = req.params.messageId;
    const content = req.body.content;

    try {
        const message = await getSingleMessage(messageId);
        if (!message) {
            const error = new Error('Could not find message.');
            error.statusCode = 404;
            throw error;
        }

        const changedAt = Date.now();
        const action = 'updated';

        const result = await updateSingleMessage(message, { content, changedAt, action });
        pusher.trigger(channel, 'updated', result);

        res.status(201).json(result);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

const deleteMessage = async (req, res, next) => {
    const messageId = req.params.messageId;

    try {
        const message = await getSingleMessage(messageId).lean();
        if (!message) {
            const error = new Error('Could not find message.');
            error.statusCode = 404;
            throw error;
        }


        const result = await getSingleMessageAndRemove(messageId);
        result.changedAt = Date.now();
        result.action = 'deleted';

        pusher.trigger(channel, 'deleted', result);

        res.status(201).json(result);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

export { createMessage, getMessages, getMessage, updateMessage, deleteMessage };