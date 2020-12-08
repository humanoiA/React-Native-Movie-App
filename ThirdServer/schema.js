const {gql} = require('apollo-server');
const {findByIdAndDelete} = require('./models/movie');
const Movies = require('./models/movie');
const User = require('./models/userAuthentication');
const bcrypt = require('bcrypt');

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    producer: String!
    rating: String!
    genre: String!
  }
  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
    users: [User]
  }
  type User {
    _id: String
    email: String
  }
  type Mutation {
    addMovie(
      name: String!
      producer: String!
      rating: String!
      genre: String!
    ): Movie
    updateMovie(
      name: String!
      producer: String!
      rating: String!
      genre: String!
    ): Movie
    deleteMovie(id: String!): Movie
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;
const resolvers = {
  Query: {
    getMovies: (parent, args) => {
      return Movies.find({});
    },
    users: () => users,
    getMovie: (parent, args) => {
      return Movies.findById(args.id);
    },
  },
  Mutation: {
    addMovie: (parent, args) => {
      let Movie = new Movies({
        name: args.name,
        producer: args.producer,
        rating: args.rating,
        genre: args.genre,
      });
      return Movie.save();
    },
    login: async (root, {email, password}, {mongo}) => {
      //const Users = mongo.collection('users');

      const user = await User.findOne({email});
      if (!user) {
        throw new Error('Email not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Password is incorrect');
      }

      return user;
    },
    signup: async (root, {email, password}, {mongo}) => {
      //const Users = mongo.collection('users');
      const existingUser = await User.findOne({email});

      if (existingUser) {
        throw new Error('Email already used');
      }

      const hash = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hash,
      });
      const user = await User.findOne({email});

      return user;
    },
    updateMovie: (parent, args) => {
      if (!args.name) return;
      return Movies.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            name: args.name,
            producer: args.producer,
            rating: args.rating,
            genre: args.genre,
          },
        },
        {new: true},
        (err, Movie) => {
          if (err) {
            console.log('Error');
          } else {
          }
        },
      );
    },
    deleteMovie: (parent, args) => {
      if (!args.id) return;
      return Movies.findByIdAndDelete(args.id);
    },
  },
};
module.exports = {typeDefs, resolvers};
