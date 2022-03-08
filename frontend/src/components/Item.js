import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import EditItem from './EditItem';
import config from '../config/config';

const GET_ITEM_DISPLAY_PIC_API = config.baseUrl+"/api/item/display-picture/";

const Item = ({index,items,setItems,currency,editRights}) => {
  
    const [editMode,setEditMode] = useState(false);
    const [displayPicture,setDisplayPicture] = useState(items[index].displayPicture);
    const [name,setName] = useState(items[index].name);
    const [category,setCategory] = useState(items[index].category);
    const [price,setPrice] = useState(items[index].price);
    const [quantity,setQuantity] = useState(items[index].quantity);
    const [salesCount,setSalesCount] = useState(items[index].salesCount);
    const [description,setDescription] = useState(items[index].description);
    
    const setMode = ()=>{
        setEditMode(true);
    }
    return (
        <div>
            
            {editRights && <EditItem currency={currency} id={items[index].id} items={items} setItems={setItems} index={index} displayPicture={displayPicture} setDisplayPicture={setDisplayPicture} name={name} setName={setName} category={category} setCategory={setCategory} price={price} setPrice={setPrice} quantity={quantity} setQuantity={setQuantity} salesCount={salesCount} setSalesCount={setSalesCount} description={description} setDescription={setDescription}/>}
            <div>
                
                <div className="col-md-12">
                    <div><img src={GET_ITEM_DISPLAY_PIC_API+displayPicture} className="profile_picture"></img></div>
                </div>
                <div>{name}</div>
                <div>{category}</div>
                <div>{currency.name+" "+price}</div>
                <div>{quantity}</div>
                <div>{salesCount}</div>
                <div>{description}</div>
            </div>
        </div>
        
    )
}

export default Item