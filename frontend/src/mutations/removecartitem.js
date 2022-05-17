
import { gql } from '@apollo/client';

const removeCartItemMutation = gql`
    mutation removecartitem($id: String!){
            removecartitem(userId: $id){
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

export {removeCartItemMutation};