
import { gql } from '@apollo/client';

const getShopQuery = gql`
    query getshop($userId: String!) {
    getshop(userId: $userId) {
         _id
        name
        owner
        displayPicture
    }
  }
`;

export {getShopQuery};