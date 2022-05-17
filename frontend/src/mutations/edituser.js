
import { gql } from '@apollo/client';

const editUserMutation = gql`
    mutation edituser($name: String!, $email: String!, $profilePicture: String!,$country: String!,$currency: String!,$about: String!,$address: String!,$city: String!,$date: String!,$gender: String!,$phone: String!){
            editeuser(name: $name, email: $email, profilePicture: $profilePicture,country:$country,currency:$currency,about:$about,address:$address,city:$city,date:$date,gender:$gender,phone:$phone){
            name
            email
            profilePicture
            country
            currency
            about
            address
            city
            date
            gender
            phone
        }
    }
`;

export {editUserMutation};