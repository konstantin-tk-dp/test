import Message from '../models/message.js';

export function getAllMessages() {
    return Message.find()
}

export function getSingleMessage(itemId) {
    return Message.findById(itemId)
}

export function createSingleMessage({...newMessage}) {
    const message = new Message({ ...newMessage });
    return message.save()
}

export function updateSingleMessage(message, { ...newMessage }) {
    message.content = newMessage.content;
    message.changedAt = newMessage.changedAt;
    message.action = newMessage.action;
    return message.save()
}

export function getSingleMessageAndRemove(itemId) {
    return Message.findByIdAndRemove(itemId);
}