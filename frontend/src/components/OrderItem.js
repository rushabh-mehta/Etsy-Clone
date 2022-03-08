import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const OrderItem = ({item, currency}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!token || !user){
            navigate("/login", {replace:true});
        }
    });

    return (
        <div>
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.displayPicture}</div>
                <div>{item.orderId}</div>
                <div>{item.name}</div>
                <div>{currency.name+" "+item.price}</div>
                <div>{item.orderQuantity}</div>
                <div>{item.date}</div>
                <div>{item.shopName}</div>
            </div>
        </div>
    )
}

export default OrderItem