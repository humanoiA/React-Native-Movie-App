const mongoose = require('mongoose');
const url = "mongodb+srv://humanoid:4v4dMl1YiqoKoB0A@cluster0.smoja.mongodb.net/kofta?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
       type: String,
       required: true
    },
    password: {
       type: String,
       required: true
    }
}, {
    timestamps: true
});
var Users = mongoose.model('users', userSchema);
module.exports = Users