const mongoose = require('mongoose');
const url = "mongodb+srv://humanoid:4v4dMl1YiqoKoB0A@cluster0.smoja.mongodb.net/kofta?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    rating: {
       type: Number,
       required: true
    },
    producer: {
       type: String,
       required: true
   },
   genre:{
      type: String,
      required: true
   }
}, {
    timestamps: true
});
var Movies = mongoose.model('Movie', movieSchema);
module.exports = Movies