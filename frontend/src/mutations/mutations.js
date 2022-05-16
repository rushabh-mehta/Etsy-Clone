
import { gql } from '@apollo/client';

const registerUserMutation = gql`
    mutation createuser($name: String!, $email: String!, $password: String!){
            createuser(name: $name, email: $email, password: $password){
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

export {registerUserMutation};