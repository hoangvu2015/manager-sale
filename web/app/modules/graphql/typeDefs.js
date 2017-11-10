/**
 * Created by xuantu on 5/29/17.
 */
const schema = `
  scalar JSON
  
  type User {
    id: ID!
    email: String!
    name: String! 
    provider: String!
  }
  
  type ResponseUser {
    id: ID!
    email: String!
    name: String! 
    provider: String!
  }
  
  type Category {
    id: ID!
    title: String! 
  }
  
  type Post {
    id: ID!
    slug: String!
    title: String! 
    content: String!
    category: [Category]
  }
  
  type Query {
    getUserById(id: ID!): ResponseUser
    getUserByEmail(email: String!): ResponseUser
    
    getPostBySlug(slug: String!): Post
  }
  
  type Mutation {
    createUser(
        email: String!, 
        provider: String!,
    ): ResponseUser
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;