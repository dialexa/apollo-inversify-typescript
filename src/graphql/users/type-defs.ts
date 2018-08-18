export default `
  type User {
    id: String!
    email: String!
    username: String!
  }

  type Query {
    profile: User
    users: [User]
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!) : Boolean
  }
`;
