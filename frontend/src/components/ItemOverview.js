import React,{useState, useEffect} from 'react';
import { useLocation , useNavigate, useParams} from 'react-router-dom';
import authapi from '../services/authpost';
import { Form, Button } from 'react-bootstrap';


const GET_ITEM_API = "/api/item/"
    const ItemOverview = () => {
    const [item,setItem] = useState({});
    const navigate = useNavigate();
    const [itemLoading,setItemLoading] = useState(true);
    const [errorMsg,setErrorMsg] = useState("");
    const search = useLocation().search;
    const {id} = new useParams(search);
    const [orderQuantity,setOrderQuantity] = useState(0);

    const getItem = async (itemId)=>{
        setItemLoading(true);
        try{
        const response = await authapi.get(GET_ITEM_API+itemId);
        if(response && response.data){
            if(response.data.success){
                const item = response.data.item;
                console.log(item);
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

    const addToCart = ()=>{

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
                <div>{item.itemCategory}</div>
                <div>{item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <div>{item.itemSalesCount}</div>
                <div>{item.itemDescription}</div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control value={orderQuantity} onChange={(e)=>{setOrderQuantity(e.target.value)}}  type="number" id="quantity" />
                </Form.Group>
                <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
            </div>
        </div>  
    )
}

export default ItemOverview