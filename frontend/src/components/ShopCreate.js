import React,{useState, useEffect} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import authapi from '../services/authpost';
import {useNavigate} from "react-router-dom";

const SHOP_NAME_AVAIL_API = "api/shop/name";
const SHOP_CREATE_API = "api/shop/create";
const SHOP_HOME_PAGE = "/shop/home";

const CreateShop = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [shopAvailable, setShopNameAvailable] = useState(false);
  const [canShowAvailResult, setCanShowAvailResult] = useState(false);
  const [creatingShop, setCreatingShop] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setCanShowAvailResult(false);
  },[shopName]);

  const checkShopNameAvailable = async ()=>{
      const reqBody = {};
      reqBody.shopName = shopName;
      try{
        const response = await authapi.post(SHOP_NAME_AVAIL_API,reqBody);
        if(response && response.data){
          if(response.data.shopFound){
            setShopNameAvailable(false);
            setCanShowAvailResult(true);
          }else{
            setShopNameAvailable(true);
            setCanShowAvailResult(true);
          }
        }else{
          console.log("Some unexpected error!");
        }
      }catch(err){
        if(err && err.response && err.response.data && err.response.data.error){
          console.log(err.response.data.error);
        }
      }
  }

  const createShop = async()=>{
    setCreatingShop(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const reqBody = {};
    reqBody.user = user.id;
    reqBody.shopName = shopName;
    try{
      const response = await authapi.post(SHOP_CREATE_API,reqBody);
      if(response && response.data && response.data.success){
        setCreatingShop(false);
        navigate(SHOP_HOME_PAGE);
      }else{
         console.log("Some unexpected error!");
         setCreatingShop(false);
      }
    }catch(err){
      if(err && err.response && err.response.data && err.response.data.error){
          setErrorMsg(err.response.data.error);
      }
      setCreatingShop(false);
    }
  }

  return (
    <div>
      <div>Name your Shop</div>
      <div>Choose a memorable name that reflects your style</div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Shop Name" onChange={(e)=>{setShopName(e.target.value)}}
        />
        <Button onClick={checkShopNameAvailable} variant="outline-secondary" id="button-addon2">
          Check Availability
        </Button>
      </InputGroup>
      {canShowAvailResult && shopAvailable &&
         <div>
          <div>Available</div>
          <Button onClick={createShop} variant="outline-secondary" id="button-addon2">Create Shop</Button>
        </div>
      }
      {canShowAvailResult && !shopAvailable &&
         <div>
          <div>Not Available</div>
        </div>
      }
    </div>
  )
}

export default CreateShop