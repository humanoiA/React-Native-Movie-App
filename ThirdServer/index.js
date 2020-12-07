const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const schema = require('./schema');
const url = "mongodb+srv://humanoid:4v4dMl1YiqoKoB0A@cluster0.smoja.mongodb.net/kofta?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});
const server = new ApolloServer({
      typeDefs: schema.typeDefs,
      resolvers: schema.resolvers
});
server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`);
});