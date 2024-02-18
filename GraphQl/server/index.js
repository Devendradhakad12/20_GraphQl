const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const { todos } = require("./todos.js");
const { users } = require("./users.js");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
        id:ID!
        name:String!
        username:String!
        email:String!
        phone:String!
        website:String!
    }
    type Todo {
        id:ID!
        title:String!
        completed:Boolean
        user:User
    }
    type Query{
        getTodos :[Todo]
        getAllUsers:[User]
        getUser(id:ID!):User
    }
    `,
    resolvers: {
      Todo: {
        user: (todo) => users.find((i) => i.id === todo.id),
      },
      Query: {
        getTodos: () => todos,
        getAllUsers: () => users,
        getUser: async (parent, { id }) => users.find((i) => i.id === id),
      },
    },
  }); // Create GraphQl Server

  app.use(bodyParser.json());
  app.use(cors());

  await server.start(); // start GrahQl Server

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("server on http://localhost:8000"));
}

startServer();
