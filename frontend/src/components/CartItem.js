import React,{useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';

const REMOVE_ITEM_CART_API="/api/cart/delete";

const CartItem = ({item,cartItems,setCartItems}) => {
    const navigate = useNavigate();
    const [orderQuantity,setOrderQuantity] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!token || !user){
            navigate("/login", {replace:true});
        }
    });

    useEffect(() => {
        item.orderQuantity = orderQuantity;
        let filteredCartItems = cartItems.filter((eachCartItem)=>{
            return eachCartItem.cartId!=item.cartId;
        });
         setCartItems([...filteredCartItems,item]);
    },[orderQuantity]);

    const removeItem = async ()=>{
        const data = {};
        data.id = item.cartId;
        const response = await authapi.post(REMOVE_ITEM_CART_API,data);
        if(response && response.data){
            if(response.data.success){
                const filteredCartItems = cartItems.filter((eachCartItem)=>{
                    return eachCartItem.cartId!=item.cartId;
                });
                setCartItems(filteredCartItems);
            }else{
            console.log("Error placing order");
            }
        }else{
            console.log(response);
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
                <div>{item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.orderQuantity}</div>
                <div>{item.itemDescription}</div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control value={orderQuantity} onChange={(e)=>{setOrderQuantity(e.target.value)}}  type="number" id="quantity" />
                </Form.Group>
                <Button variant="danger" onClick={removeItem}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default CartItem