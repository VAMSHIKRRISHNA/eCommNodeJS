const mongoose = require('mongoose')
const uri = " mongodb://127.0.0.1:27017/eCommerce"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
  console.log("we're connected!");
});

module.exports = mongoose.connection
