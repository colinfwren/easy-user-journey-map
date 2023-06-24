const { gql, ApolloServer } = require("apollo-server");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
require("dotenv").config();

const typeDefs = gql`
  type UserJourney {
    id: ID! @id
    name: String
    description: String
    screens: [Screen!]! @relationship(type: "VISITS", direction: OUT)
    tasks: [Task!]! @relationship(type: "PERFORMS", direction: OUT)
  }
  
  type Screen {
    id: ID! @id
    name: String
    userJourneys: [UserJourney!]! @relationship(type: "VISITS", direction: IN)
    tasks: [Task!]! @relationship(type: "PERFORMED_ON", direction: IN)
  }
  
  type Task {
    id: ID! @id
    name: String
    userJourneys: [UserJourney!]! @relationship(type: "PERFORMS", direction: IN)
    screens: [Screen!]! @relationship(type: "PERFORMED_ON", direction: OUT)
  }
`;

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema
  });

  server.listen().then((foo) => {
    console.log(foo)
  })
})
