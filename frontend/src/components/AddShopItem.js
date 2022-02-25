import React,{useState, useEffect} from 'react';
import {InputGroup, FormControl, Button, Modal, Form} from 'react-bootstrap';
import authapi from '../services/authpost';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";

const GET_CATEGORIES_API = "/api/category/";
const ADD_ITEM_API = "/api/item/add";

const AddShopItem = ({setItems,items,id}) => {
    const navigate = useNavigate();
    const [categories,setCategories] = useState([]);
    const [gettingCategories,setGettingCategories] = useState([]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [addingItem, setAddingItem] = useState(false);
    const [name,setName] = useState("");
    const [displayPicture,setDisplayPicture] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);

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

    const addItem = async () => {
        setAddingItem(true);
        const item = {
            name,
            displayPicture,
            category,
            description,
            price,
            quantity,
            salesCount:0,
            shopId:id
        };
        try{
            const response = await authapi.post(ADD_ITEM_API,item);
            if(response && response.data && response.data.success){
                setItems([...items,item]);
                setAddingItem(false);
                handleClose();
            }else{
                setError("Some unexpected error occurred!");
                setAddingItem(false);
            }
        }catch(e){
            console.log(e);
            setError("Some unexpected error occurred!");
            setAddingItem(false);
        }
    }


    const handleClose = () => setShow(false);
    const handleShow = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        getCategories(user);
        setShow(true)
    };

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
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show && !gettingCategories} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className="col-md-12">
                    <img className="profile_picture"></img>
                    <div><FontAwesomeIcon icon={faCamera}/></div>
                </div>
                <Form.Group value={name} className="mb-3" onChange={(e)=>{setName(e.target.value)}}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group value={price} className="mb-3" onChange={(e)=>{setPrice(e.target.value)}}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" />
                </Form.Group>
                <Form.Group value={quantity} className="mb-3" onChange={(e)=>{setQuantity(e.target.value)}}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Quantity" />
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
                <Form.Group value={description} className="mb-3" onChange={(e)=>{setDescription(e.target.value)}}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addItem}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddShopItem;