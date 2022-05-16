
import { gql } from '@apollo/client';

const addShopItemMutation = gql`
    mutation additem($name: String!, $displayPicture: String!, $category: String!, $description: String!,  $price: String!,  $quantity: Int,  $salesCount: Int,  $shopId: String!){
            additem(name: $name, displayPicture: $displayPicture, category: $category, description: $description, price: $price, quantity: $quantity, salesCount: $salesCount, shopId: $shopId){
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

export {addShopItemMutation};