const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect('mongodb+srv://db_user_telegramer:e9WvIgjhkFXy6taw@cluster0-eeq7m.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
     useUnifiedTopology: true,
});
console.log('[db] Conectada con exito')

function addMessage(message) {
/*     list.push(message); */
    const myMessage = new Model(message);
    const rta = myMessage.save();
    myMessage.save();
}

async function getMessages() {
    /* return list; */
    const messages = await Model.find();
    return messages
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    //get
    //update
    //delete
}