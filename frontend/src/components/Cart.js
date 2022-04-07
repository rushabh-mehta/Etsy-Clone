import React,{useState, useEffect} from 'react';
import CartItem from './CartItem';
import {useNavigate} from "react-router-dom";
import {axiosInstance as authapi} from '../services/authpost';

import { Form, Button } from 'react-bootstrap';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';
import '../styles/cart.css';
import { addCartItems } from "../redux/actions/actions.js";
import { connect } from "react-redux";



const CART_ITEMS_API = "/api/cart/get/";
const PLACE_ORDER_API = "/api/order/place/";
const LOGIN_PAGE = "/login";
const ORDERS_PAGE = "/orders";
const GET_USER_CURRENCY_API = "api/currency/";
const HOME_PAGE = "/";



const ConnectedCart = ({searchQuery,setSearchQuery,addCartItems}) => {
    const navigate = useNavigate();
    const [cartItems,setCartItems] = useState([]);
    const [currency,setCurrency] = useState({});
    const [cartCost,setCartCost] = useState(0);
    const [invalidOrder, setInvalidOrder] = useState([]);
    const [canPlaceOrder, setCanPlaceOrder] = useState(true);
    const [orderPlaceErrorMsg, setOrderPlaceErrorMsg] = useState("");
    const [totalOrderCost,setTotalOrderCost] = useState(0);
    const [orderPlaceSuccessMsg,setOrderPlaceSuccessMsg] = useState("");
    const [gettingCartItems,setGettingCartItems] = useState(true);

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
      setGettingCartItems(true);
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
                          setCartItems(response.data.items);
                          addCartItems(response.data.items);
                          let invalidOrderCopy = [];
                          response.data.items.forEach((item)=>{
                                invalidOrderCopy.push(false);
                          })
                          setInvalidOrder(invalidOrderCopy);
                          setGettingCartItems(false);
                      }else{
                        setCartItems([]);
                        setGettingCartItems(false);
                      }
                  }else{
                      console.log(response);
                        setGettingCartItems(false);
                  }
              }else{
                  console.log(response);
                setGettingCartItems(false);
              }
          }catch(err){
              if(err && err.response && err.response.data && err.response.data.error){
                  console.log(err.response.data.error);
              }
              setGettingCartItems(false);
          }
      }
  }

  const placeOrder = async ()=>{
      setOrderPlaceErrorMsg("");
      setOrderPlaceSuccessMsg("");
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {};
      data.userId = user.id;
      if(!token || !user){
          navigate(LOGIN_PAGE, {replace:true});
      }else if(!user.address || !user.country || !user.city){
        setOrderPlaceErrorMsg("Please specify complete address details in your profile section before placing order!");
      }else{
          try{
              const response = await authapi.post(PLACE_ORDER_API,data);
              if(response && response.data){
                  if(response.data.success){
                    setOrderPlaceSuccessMsg("Order placed successfully!"); 
                    setTimeout(()=>{
                        setOrderPlaceSuccessMsg("");
                        navigate(ORDERS_PAGE, {replace:true});
                    },2500);
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

    const getOtherFilterItems = ()=>{
        navigate(HOME_PAGE);
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

  useEffect(() => {
        let flag = false;
        invalidOrder.forEach((eachOrderInvalid)=>{
            if(eachOrderInvalid){
                setCanPlaceOrder(false);
                flag=true;
            }
      })
      if(!flag){
          setCanPlaceOrder(true);
      }
  },[invalidOrder]);

  useEffect(() => {
        let totalCost = 0;
        cartItems.forEach((eachCartItem)=>{
            console.log(eachCartItem);
            totalCost+=parseInt(eachCartItem.orderQuantity)*parseFloat(eachCartItem.item.price);
        });
        setTotalOrderCost(totalCost);
  },[cartItems]);

  return (
    <div>{
        !gettingCartItems && 
        <div>
        <MainNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} getOtherFilterItems={getOtherFilterItems}/>
        <div className="container cart-heading">
            <h1>Your Cart</h1>
        </div>
        <div className="cart-items-container">
            {cartItems && cartItems.map((eachCartItem,index)=>{  
                return <CartItem key={index} index={index} invalidOrder={invalidOrder} setInvalidOrder={setInvalidOrder} currency={currency} key={eachCartItem.cartId} cartItems={cartItems} setCartItems={setCartItems} item={eachCartItem}/>
                })}
            {!cartItems || !cartItems.length &&
                <div className="container cart-heading ">Cart Empty!</div>
            }
            <div className="container">
                <Button className="cart_order-btn" onClick={placeOrder} disabled={!canPlaceOrder || !cartItems || !cartItems.length}>Place Order</Button>
                <span className="cart-cost">{"Total Cost: "+(currency && currency.name)+" "+totalOrderCost}</span>
                {orderPlaceErrorMsg && <div className="addcart-error">{orderPlaceErrorMsg}</div>}
                {orderPlaceSuccessMsg && <div className="addcart-success">{orderPlaceSuccessMsg}</div>}
            </div>
            </div>
        <MainFooter currency={currency} setCurrency={setCurrency}/>
        </div>
    }
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addCartItems: (cartItems) => dispatch(addCartItems(cartItems)),
  };
}



const Cart = connect(null,mapDispatchToProps)(ConnectedCart);

export default Cart;