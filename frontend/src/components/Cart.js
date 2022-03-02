import React,{useState, useEffect} from 'react';
import CartItem from './CartItem';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';



const CART_ITEMS_API = "/api/cart/get/";
const LOGIN_PAGE = "/login";


const Cart = () => {
  const navigate = useNavigate();
  const [cartItems,setCartItems] = useState([]);

  const getCartItems = async ()=>{
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if(!token || !user){
          navigate(LOGIN_PAGE, {replace:true});
      }else{
          try{
              const response = await authapi.get(CART_ITEMS_API+user.id);
              if(response && response.data){
                  if(response.data.success){
                      if(response.data.items){
                          console.log(response.data.items);
                          setCartItems(response.data.items);
                      }else{
                          setCartItems([]);
                      }
                  }else{
                      console.log(response);
                  }
              }else{
                  console.log(response);
              }
          }catch(err){
              if(err && err.response && err.response.data && err.response.data.error){
                  console.log(err.response.data.error);
              }
          }
      }
  }

  const placeOrder = ()=>{

  }

  useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if(!token || !user){
          navigate("/login", {replace:true});
      }else{
          getCartItems();
      }
  },[]);

  return (
    <div>
      {cartItems && cartItems.length && cartItems.map((eachCartItem)=>{
        return <CartItem item={eachCartItem}/>
      })}
       <Button variant="primary" onClick={placeOrder}>Order</Button>
    </div>
  )
}

export default Cart