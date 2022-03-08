import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import config from '../config/config';

const GET_ITEM_DISPLAY_PIC_API = config.baseUrl+"/api/item/display-picture/";


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
                <div className="col-md-12">
                    <div><img src={GET_ITEM_DISPLAY_PIC_API+item.displayPicture} className="profile_picture"></img></div>
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