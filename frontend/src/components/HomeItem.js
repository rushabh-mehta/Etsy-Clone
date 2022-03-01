import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const HomeItem = ({item}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(!token || !user){
            navigate("/login", {replace:true});
        }
    });

    const viewItemOverview = ({id})=>{
        if(id) {
             navigate("/item/overview/"+id);
        }
    }

    return (
        <div>
            <div onClick={()=>{viewItemOverview(item)}}>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.displayPicture}</div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.price}</div>
                <div>{item.quantity}</div>
                <div>{item.salesCount}</div>
                <div>{item.description}</div>
            </div>
        </div>
    )
}

export default HomeItem