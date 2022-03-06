import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';
import { faTimes, faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const REMOVE_FAVORITE_ITEM_API = "api/favoriteitem/remove";
const ADD_FAVORITE_ITEM_API = "api/favoriteitem/add";

const HomeItem = ({item,items,setItems,index}) => {
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

    const removeFavoriteItem = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const data = {};
        data.itemId = item.id;
        data.userId = user.id;
        try{
            const response = await authapi.post(REMOVE_FAVORITE_ITEM_API,data);
            if(response && response.data){
                if(response.data.success){
                    if(response.data.removeItem){
                        const itemCopy = JSON.parse(JSON.stringify(item));
                        itemCopy.favorite = false;
                        items[index] = itemCopy;
                        const itemsCopy = JSON.parse(JSON.stringify(items));
                        setItems(itemsCopy);
                    }else{
                    console.log(response);
                    }
                }else{
                    console.log(response);
                }
            }else{
                console.log(response);
            }
        }catch(err){
            if(err && err.response && err.response.data && err.response.data.error){
                if(err.response.data.itemExists){
                    console.log(err.response.data.error);
                }
            }
        }
    }

    const addFavoriteItem = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const data = {};
        data.itemId = item.id;
        data.userId = user.id;
        try{
            const response = await authapi.post(ADD_FAVORITE_ITEM_API,data);
            if(response && response.data){
                if(response.data.success){
                    if(response.data.favoriteItem){
                        const itemCopy = JSON.parse(JSON.stringify(item));
                        itemCopy.favorite = true;
                        items[index] = itemCopy;
                        const itemsCopy = JSON.parse(JSON.stringify(items));
                        setItems(itemsCopy);
                    }else{
                    console.log(response);
                    }
                }else{
                    console.log(response);
                }
            }else{
                console.log(response);
            }
        }catch(err){
            console.log(err);
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
            {!item.favorite && <div><FontAwesomeIcon onClick={addFavoriteItem} icon={faHeart}/></div>}
            {item.favorite && <div><FontAwesomeIcon onClick={removeFavoriteItem} icon={faTimes}/></div>}
        </div>
    )
}

export default HomeItem