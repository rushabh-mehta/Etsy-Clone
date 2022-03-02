import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const CartItem = ({item}) => {
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
                <div>{item.itemName}</div>
                <div>{item.itemCategory}</div>
                <div>{item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.orderQuantity}</div>
                <div>{item.itemDescription}</div>
            </div>
        </div>
    )
}

export default CartItem