
import { gql } from '@apollo/client';

const getOrderQuery = gql`
    query getorder($userId: String!) {
    getorder(userId: $userId) {
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

export {getOrderQuery};