import React,{useState,useEffect} from 'react'
import OrderItem from './OrderItem';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';

const ORDER_ITEMS_API = "/api/order/get/";
const LOGIN_PAGE = "/login";

const Orders = () => {
  const navigate = useNavigate();
  const [orderItems,setOrderItems] = useState();

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
                          console.log(response.data.items);
                          setOrderItems(response.data.items);
                      }else{
                          setOrderItems([]);
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

  useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if(!token || !user){
          navigate("/login", {replace:true});
      }else{
          getOrderItems();
      }
  },[]);

  return (
    <div>
      {orderItems && orderItems.length && orderItems.map((eachOrderItem)=>{
        return <OrderItem key={eachOrderItem.id} item={eachOrderItem}/>
      })}
    </div>
  )
}

export default Orders