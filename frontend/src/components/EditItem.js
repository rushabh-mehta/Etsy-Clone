import React,{useState, useEffect} from 'react';
import {InputGroup, FormControl, Button, Modal, Form} from 'react-bootstrap';
import authapi from '../services/authpost';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";

const GET_CATEGORIES_API = "/api/category/";
const EDIT_ITEM_API = "/api/item/edit";

const EditItem = ({items,setItems,index,id,name,setName,displayPicture,setDisplayPicture,category,setCategory,description,setDescription,price,setPrice,quantity,setQuantity}) => {
    const navigate = useNavigate();
    const [categories,setCategories] = useState([]);
    const [gettingCategories,setGettingCategories] = useState([]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [editingItem, setEditingItem] = useState(false);
    
    const getCategories = async ({id}) => {
        setGettingCategories(true);
        try{
            const response = await authapi.get(GET_CATEGORIES_API+id);
            if(response && response.data && response.data.success && response.data.categories){
                setCategories(response.data.categories);
                setGettingCategories(false);
            }else{
                setError("Some unexpected error occurred!");
                setGettingCategories(false);
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
            setGettingCategories(false);
        }
    }

    

    const handleClose = () => setShow(false);

    const handleShow = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        getCategories(user);
        setShow(true);
    };

    const editItem = async ()=>{
        setEditingItem(true);
        const item = {};
        item.displayPicture = displayPicture;
        item.name = name;
        item.price = price;
        item.quantity = quantity;
        item.category = category;
        item.description = description;
        item.id=id;
        items[index] = item;
        setItems(items);
        try{
            const response = await authapi.post(EDIT_ITEM_API,item);
            if(response && response.data && response.data.success){
                
                setEditingItem(false);
                handleClose();
            }else{
                setError("Some unexpected error occurred!");
                setEditingItem(false);
            }
        }catch(e){
            setEditingItem(false);
        }
        handleClose();
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getCategories(user);
        }
    },[]);

  return (
    <>
      <FontAwesomeIcon className="edit_icon" icon={faPen} onClick={handleShow}/>
      <Modal show={show && !gettingCategories} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className="col-md-12">
                    <img className="profile_picture"></img>
                    <div><FontAwesomeIcon icon={faCamera}/></div>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e)=>{setPrice(e.target.value)}} value={price} type="number" placeholder="Price" />
                </Form.Group>
                <Form.Group  className="mb-3" >
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control onChange={(e)=>{setQuantity(e.target.value)}} value={quantity} type="number" placeholder="Quantity" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" id="category" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                        <option value="">Select Category</option>
                        {
                            categories.map((eachCategory,index)=>{
                                return <option key={index} value={eachCategory.id}>{eachCategory.name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e)=>{setDescription(e.target.value)}} value={description}  as="textarea" placeholder="Description" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditItem;