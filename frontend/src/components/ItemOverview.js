import React,{useState, useEffect} from 'react';
import { useLocation , useNavigate, useParams, Link} from 'react-router-dom';
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';
import { faTimes, faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const GET_ITEM_API = "/api/item/";
const ADD_CART_API = "api/cart/add/";
const ADD_FAVORITE_ITEM_API = "api/favoriteitem/add";
const REMOVE_FAVORITE_ITEM_API = "api/favoriteitem/remove";
const GET_USER_CURRENCY_API = "api/currency/";
const SHOP_HOME_PAGE = "/shop/home/";


const ItemOverview = () => {
    const [item,setItem] = useState({});
    const navigate = useNavigate();
    const [itemLoading,setItemLoading] = useState(true);
    const [errorMsg,setErrorMsg] = useState("");
    const search = useLocation().search;
    const {id} = new useParams(search);
    const [orderQuantity,setOrderQuantity] = useState(1);
    const [addToCartSuccessMsg,setAddToCartSuccessMsg] = useState("");
    const [itemExistsMsg,setItemExistsMsg] = useState("");
    const [notEnoughStockMessage,setNotEnoughStockMessage] = useState("");
    const [currency,setCurrency] = useState({});

    const getItem = async (itemId)=>{
        setItemLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        try{
        const response = await authapi.get(GET_ITEM_API+itemId+"/"+userId);
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
        if(parseInt(orderQuantity)>item.itemQuantity){
            setNotEnoughStockMessage("Insufficient quantity!");
            setTimeout(()=>{
                setNotEnoughStockMessage("");
            },5000);
        }else{
            console.log(item);
            const data = {};
            const user =  JSON.parse(localStorage.getItem("user"));
            data.userId = user.id;
            data.itemId = id;
            data.orderQuantity = orderQuantity;
            try{
                const response = await authapi.post(ADD_CART_API,data);
                if(response && response.data){
                    if(response.data.success){
                        if(response.data.addedItem){
                            const shop = response.data.addedItem;
                            setOrderQuantity(1);
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
    }

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
                        const itemCopy = JSON.parse(JSON.stringify(item));
                        itemCopy.favorite = false;
                        setItem(itemCopy);
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
                    console.log(err.response.data.error);
            }
        }
    }

    const addFavoriteItem = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const data = {};
        data.itemId = item.itemId;
        data.userId = user.id;
        try{
            const response = await authapi.post(ADD_FAVORITE_ITEM_API,data);
            if(response && response.data){
                if(response.data.success){
                    if(response.data.favoriteItem){
                        const itemCopy = JSON.parse(JSON.stringify(item));
                        itemCopy.favorite = true
                        setItem(itemCopy);
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
                console.log(err.response.data.error);
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getItem(id);
            getUserCurrency(user);
        }
    },[]);

    useEffect(() => {
        setItem({...item,orderQuantity});
    },[orderQuantity]);

    return (
        <div>
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.itemDisplayPicture}</div>
                <div>{item.itemName}</div>
                <Link to={SHOP_HOME_PAGE+item.shopId}>{item.shopName}</Link>
                <div>{item.categoryName}</div>
                <div>{currency.name+" "+item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.itemSalesCount}</div>
                <div>{item.itemDescription}</div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control value={orderQuantity} onChange={(e)=>{setOrderQuantity(e.target.value)}}  type="number" id="quantity" />
                </Form.Group>
                {!item.favorite && <div><FontAwesomeIcon onClick={addFavoriteItem} icon={faHeart}/></div>}
                {item.favorite && <div><FontAwesomeIcon onClick={removeFavoriteItem} icon={faTimes}/></div>}
                <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                {addToCartSuccessMsg && <div>{addToCartSuccessMsg}</div>}
                {itemExistsMsg && <div>{itemExistsMsg}</div>}
                {notEnoughStockMessage && <div>{notEnoughStockMessage}</div>}
            </div>
        </div>  
    )
}

export default ItemOverview