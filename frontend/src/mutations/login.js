
import { gql } from '@apollo/client';

const loginMutation = gql`
    mutation login($email: String!, $password: String!){
            login(email: $email, password: $password){
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

export {loginMutation};