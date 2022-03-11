import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import authapi from '../services/authpost';
import { faTimes, faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../config/config';


const GET_ITEM_DISPLAY_PIC_API = config.baseUrl+"/api/item/display-picture/";
const REMOVE_FAVORITE_ITEM_API = "api/favoriteitem/remove";
const ADD_FAVORITE_ITEM_API = "api/favoriteitem/add";

const HomeItem = ({item,items,setItems,index,currency}) => {
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
            {item && <div onClick={()=>{viewItemOverview(item)}}>
                <div className="col-md-12">
                    <div><img src={GET_ITEM_DISPLAY_PIC_API+item.displayPicture} className="profile_picture"></img></div>
                </div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{(currency && currency.name)+" "+item.price}</div>
                <div>{item.quantity}</div>
                <div>{item.salesCount}</div>
                <div>{item.description}</div>
            </div>}
            {!item.favorite && <div><FontAwesomeIcon onClick={addFavoriteItem} icon={faHeart}/></div>}
            {item.favorite && <div><FontAwesomeIcon onClick={removeFavoriteItem} icon={faTimes}/></div>}
        </div>
    )
}

export default HomeItem