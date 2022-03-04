import React,{useState, useEffect} from 'react';
import { useLocation , useNavigate, useParams} from 'react-router-dom';
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';


const GET_ITEM_API = "/api/item/";
const ADD_CART_API = "api/cart/add/";
const ItemOverview = () => {
    const [item,setItem] = useState({});
    const navigate = useNavigate();
    const [itemLoading,setItemLoading] = useState(true);
    const [errorMsg,setErrorMsg] = useState("");
    const search = useLocation().search;
    const {id} = new useParams(search);
    const [addToCartSuccessMsg,setAddToCartSuccessMsg] = useState("");
    const [itemExistsMsg,setItemExistsMsg] = useState("");

    const getItem = async (itemId)=>{
        setItemLoading(true);
        try{
        const response = await authapi.get(GET_ITEM_API+itemId);
        if(response && response.data){
            if(response.data.success){
                const item = response.data.item;
                setItem(item);
                setItemLoading(false);
            }else{
                setErrorMsg("Some unexpected error occurred!");
                setItemLoading(false);
            }
        }else{
            setErrorMsg("Some unexpected error occurred!");
            setItemLoading(false);
        }
        }catch(err){
            if(err && err.response && err.response.data && err.response.data.error){
                setErrorMsg(err.response.data.error);
            }
            setItemLoading(false);
        }
    }

    const addToCart = async ()=>{
        const data = {};
        const user =  JSON.parse(localStorage.getItem("user"));
        data.userId = user.id;
        data.itemId = id;
        try{
            const response = await authapi.post(ADD_CART_API,data);
            if(response && response.data){
                if(response.data.success){
                    console.log(JSON.stringify(response.data));
                    if(response.data.addedItem){
                        const shop = response.data.addedItem;
                        setAddToCartSuccessMsg("Item added to cart successfully!");
                        setTimeout(()=>{
                            setAddToCartSuccessMsg("");
                        },5000);
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
                    setItemExistsMsg("Item already added to cart!");
                    setTimeout(()=>{
                        setItemExistsMsg("");
                    },5000);
                }else{
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
            getItem(id);
        }
    },[]);

    

    return (
        <div>
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.itemDisplayPicture}</div>
                <div>{item.itemName}</div>
                <div>{item.itemCategory}</div>
                <div>{item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.itemSalesCount}</div>
                <div>{item.itemDescription}</div>
                <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                {addToCartSuccessMsg && <div>{addToCartSuccessMsg}</div>}
                {itemExistsMsg && <div>{itemExistsMsg}</div>}
            </div>
        </div>  
    )
}

export default ItemOverview