import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';

const REMOVE_ITEM_CART_API = "/api/cart/delete";
const UPDATE_ITEM_QUANTITY_CART_API = "/api/cart/item/quantity";


const CartItem = ({ item, cartItems, setCartItems,currency }) => {
    const navigate = useNavigate();
    const [orderQuantity, setOrderQuantity] = useState(item.orderQuantity);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (!token || !user) {
            navigate("/login", { replace: true });
        }
    });

    useEffect(async () => {
        if (orderQuantity) {
            item.orderQuantity = orderQuantity;
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const data = {};
                console.log(item);
                data.cartId = item.cartId;
                data.userId = user.id;
                data.itemId = item.itemId;
                data.orderQuantity = orderQuantity;
                const response = await authapi.post(UPDATE_ITEM_QUANTITY_CART_API, data);
                if (response && response.data && response.data.success) {
                    let filteredCartItems = cartItems.filter((eachCartItem) => {
                        return eachCartItem.cartId != item.cartId;
                    });
                    setCartItems([...filteredCartItems, item]);
                } else {
                    console.log("Error updating quantity");
                }
            } catch (e) {

            }
        }
    }, [orderQuantity]);

    const removeItem = async () => {
        const data = {};
        data.id = item.cartId;
        try {
            const response = await authapi.post(REMOVE_ITEM_CART_API, data);
            if (response && response.data) {
                if (response.data.success) {
                    const filteredCartItems = cartItems.filter((eachCartItem) => {
                        return eachCartItem.cartId != item.cartId;
                    });
                    setCartItems(filteredCartItems);
                } else {
                    console.log("Error removing item");
                }
            } else {
                console.log(response);
            }
        } catch (err) {
            if (err && err.response && err.response.data && err.response.data.error) {
                console.log(err.response.data.error);
            }
        }
    }
    return (
        <div>
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.displayPicture}</div>
                <div>{item.itemName}</div>
                <div>{item.itemCategory}</div>
                <div>{currency.name+" "+item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.itemDescription}</div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control value={orderQuantity} onChange={(e) => { setOrderQuantity(e.target.value) }} type="number" id="quantity" />
                </Form.Group>
                <Button variant="danger" onClick={removeItem}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default CartItem