const mongoose = require('mongoose')
const Schema = mongoose.Schema;

console.log(process.env.MONGO_URL)
function setup(mongoose){
mongoose.connect('mongodb+srv://innominate3301:Qsie1mYXxB3cKNvg@library.oqujev3.mongodb.net/?retryWrites=true&w=majority')

const UserSchema = mongoose.Schema(
  new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    membershipStatus: { type: String, required: true },
  })
);

const MessageSchema = mongoose.Schema(
   new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: String, required: true },
  timeStamp: { type: String, required: true },
  })
);

try { mongoose.model('user', UserSchema) } catch (e) {}
try { mongoose.model('message', MessageSchema) } catch (e) {}
}
module.exports = { setup } 