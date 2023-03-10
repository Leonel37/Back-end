const mongoUrl = require("mongoose");


mongoUrl
 .connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(() => {
   console.log("Conectando con MongoDB Atlas");
 })
 .catch((err) => {
   console.log(err);
 });


 module.exports = mongoUrl;