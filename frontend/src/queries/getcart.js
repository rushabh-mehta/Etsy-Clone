
import { gql } from '@apollo/client';

const getCartQuery = gql`
    query getcart($userId: String!) {
    getcart(userId: $userId) {
        Item {
            _id
            name
            displayPicture
            category
            description
            price
            quantity
            salesCount
            shop
        }
    }
  }
`;

export {getCartQuery};