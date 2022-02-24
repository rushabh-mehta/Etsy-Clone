import React,{useState, useEffect} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import authapi from '../services/authpost';

const SHOP_NAME_AVAIL_API = "api/shop/name";

const CreateShop = () => {
  const [shopName, setShopName] = useState("");
  const [shopAvailable, setShopNameAvailable] = useState(false);
  const [canShowAvailResult, setCanShowAvailResult] = useState(false);


  useEffect(() => {
    setCanShowAvailResult(false);
  },[shopName]);

  const checkShopNameAvailable = async ()=>{
      const reqBody = {};
      reqBody.shopName = shopName;
      const response = await authapi.post(SHOP_NAME_AVAIL_API,reqBody);
      try{
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
          <Button variant="outline-secondary" id="button-addon2">Create Shop</Button>
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