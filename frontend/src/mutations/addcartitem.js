
import { gql } from '@apollo/client';

const addCartItemMutation = gql`
    mutation addcartitem($userId: String!, $itemId: String!, $orderQuantity: Int!){
            addcartitem(userId: $userId, itemId: $itemId, orderQuantity: $orderQuantity){
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
`;

export {addCartItemMutation};