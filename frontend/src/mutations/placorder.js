
import { gql } from '@apollo/client';

const placeOrderMutation = gql`
    mutation placeorder($items: [ItemInput]){
        placeorder(items: $items){
            Item{
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

export {placeOrderMutation};