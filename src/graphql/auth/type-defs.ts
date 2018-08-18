export default `
  type AuthToken {
    token: String
  }

  type Mutation {
    createAccessToken(email: String, username: String, password: String!) : AuthToken
  }
`;
