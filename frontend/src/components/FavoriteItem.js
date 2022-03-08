import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart} from "@fortawesome/free-solid-svg-icons";
import EditItem from './EditItem';
import authapi from '../services/authpost';


const REMOVE_FAVORITE_ITEM_API = "api/favoriteitem/remove";
const FavoriteItem = ({item,favoriteItems,setFavoriteItems,index,currency}) => {

    const removeFavoriteItem = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const data = {};
        data.itemId = item.itemId;
        data.userId = user.id;
        try{
            const response = await authapi.post(REMOVE_FAVORITE_ITEM_API,data);
            if(response && response.data){
                if(response.data.success){
                    if(response.data.removeItem){
                        favoriteItems.splice(index,1)
                        const favoriteItemsCopy = JSON.parse(JSON.stringify(favoriteItems));
                        setFavoriteItems(favoriteItemsCopy);
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

    return (
        <div>
            
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.itemId}</div>
                <div>{item.itemName}</div>
                <div>{item.itemCategory}</div>
                <div>{currency.name+" "+item.itemPrice}</div>
                <div>{item.itemDescription}</div>
                <div><FontAwesomeIcon onClick={removeFavoriteItem} icon={faTimes}/></div>
            </div>
        </div>
        
    )
}

export default FavoriteItem