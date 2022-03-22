import React,{useState,useEffect} from 'react'
import OrderItem from './OrderItem';
import {useNavigate} from "react-router-dom";
import {axiosInstance as authapi} from '../services/authpost';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';
import '../styles/orders.css';


const ORDER_ITEMS_API = "/api/order/get/";
const LOGIN_PAGE = "/login";
const GET_USER_CURRENCY_API = "api/currency/";
const HOME_PAGE = "/";

const Orders = ({searchQuery,setSearchQuery}) => {
  const navigate = useNavigate();
  const [orders,setOrders] = useState();
  const [currency,setCurrency] = useState({});


  const getOrderItems = async ()=>{
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if(!token || !user){
          navigate(LOGIN_PAGE, {replace:true});
      }else{
          try{
              const response = await authapi.get(ORDER_ITEMS_API+user.id);
              if(response && response.data){
                  if(response.data.success){
                      if(response.data.items){
                          setOrders(response.data.items);
                      }else{
                          setOrders([]);
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
    const getOtherFilterItems = ()=>{
        navigate(HOME_PAGE);
    }
  useEffect(() => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if(!token || !user){
          navigate("/login", {replace:true});
      }else{
          getOrderItems();
          getUserCurrency(user);
      }
  },[]);

  return (
    <div>
      <MainNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} getOtherFilterItems={getOtherFilterItems}/>
      <div className="container cart-heading">
        <h1>Your Orders</h1>
      </div>
        <div className="order-items">
            {orders && Object.keys(orders).map((eachOrderId)=>{
                let orderTotal = 0;
                return orders[eachOrderId] && orders[eachOrderId].map((eachOrderItem,index)=>{
                    orderTotal += parseFloat(eachOrderItem.price);
                    if(index===orders[eachOrderId].length-1){
                        return <><OrderItem currency={currency} key={eachOrderItem.id} item={eachOrderItem}/><div className="container">Order Total: {currency && currency.name+" "+orderTotal} </div></>
                    }
                    return <OrderItem currency={currency} key={eachOrderItem.id} item={eachOrderItem}/>
                })
            })}
            {!orders || !Object.keys(orders).length && 
                <div className="container"> No past orders!</div>
            }
        </div>
       <MainFooter currency={currency} setCurrency={setCurrency}/>
    </div>
  )
}

export default Orders