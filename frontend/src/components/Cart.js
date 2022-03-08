import React,{useState, useEffect} from 'react';
import CartItem from './CartItem';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';
import MainFooter from './MainFooter';


const CART_ITEMS_API = "/api/cart/get/";
const PLACE_ORDER_API = "/api/order/place/";
const LOGIN_PAGE = "/login";
const ORDERS_PAGE = "/orders";
const GET_USER_CURRENCY_API = "api/currency/";



const Cart = () => {
  const navigate = useNavigate();
  const [cartItems,setCartItems] = useState([]);
  const [currency,setCurrency] = useState({});

 const getUserCurrency = async ({currency})=>{
      try{
          const response = await authapi.get(GET_USER_CURRENCY_API+currency);
          if(response && response.data){
              if(response.data.success){
                  setCurrency(response.data.currency);
              }else{
                  console.log(response);
              }
          }else{
              console.log(response);
          }
      }catch(err){
          console.log(JSON.stringify(err));
      }
  }

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

  const placeOrder = async ()=>{
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {};
      data.userId = user.id;
      if(!token || !user){
          navigate(LOGIN_PAGE, {replace:true});
      }else{
          try{
              const response = await authapi.post(PLACE_ORDER_API,data);
              if(response && response.data){
                  if(response.data.success){
                    navigate(ORDERS_PAGE, {replace:true});
                  }else{
                    console.log("Error placing order");
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

  useEffect(() => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if(!token || !user){
          navigate("/login", {replace:true});
      }else{
          getCartItems();
          getUserCurrency(user);
      }
  },[]);

  return (
    <div>
      {cartItems && cartItems.length && cartItems.map((eachCartItem)=>{
        return <CartItem currency={currency} key={eachCartItem.cartId} cartItems={cartItems} setCartItems={setCartItems} item={eachCartItem}/>
      })}
       <Button variant="primary" onClick={placeOrder}>Order</Button>
       <MainFooter currency={currency} setCurrency={setCurrency}/>
    </div>
  )
}

export default Cart