import { gql } from '@apollo/client';

const register = gql`
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      data {
        username
        role
      }
      token
    }
  }
`;

const login = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      data {
        _id
        username
        role
      }
      token
    }
  }
`;

export { register, login };
