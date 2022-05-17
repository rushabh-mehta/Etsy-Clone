
import { gql } from '@apollo/client';

const getUserQuery = gql`
    query getuser($id: String!) {
    getuser(id: $id) {
        id
        _id
        name
        email
        password
        profilePicture
        country
        currency
        about
        address 
        city
        date
        gender
        phone
        token
    }
  }
`;

export {getUserQuery};