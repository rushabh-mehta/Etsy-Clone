import React,{useState, useEffect} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import authapi from '../services/authpost';
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import LoadingIcons from 'react-loading-icons';
import AddShopItem from './AddItem';
import Item from './Item';
import MainFooter from './MainFooter';


const GET_SHOP_API = "/api/shop/home/";
const GET_USER_CURRENCY_API = "api/currency/";

const ShopHome = () => {
    const search = useLocation().search;
    const {shopId} = new useParams(search);
  const [totalSales,setTotalSales] = useState(0);
  const [shop,setShop] = useState({});
  const [shopDetailsLoading, setShopDetailsLoading] = useState({});
  const [error,setError] = useState({});
  const navigate = useNavigate();
  const [items,setItems] = useState([]);
  const [currency,setCurrency] = useState({});
  const [editRights,setEditRights] = useState(false);


  const getShop = async ({id})=>{
    setShopDetailsLoading(true);
    const data = {};
    data.shopId = shopId;
    data.userId = id; 
    try{
        const response = await authapi.post(GET_SHOP_API,data);
        if(response && response.data && response.data.success && response.data.shopFound){
            setShop(response.data.shop);
            setItems(response.data.shopItems);
            setEditRights(response.data.editRights);
            setShopDetailsLoading(false);
        }else{
            setError("Some unexpected error occurred!");
            setShopDetailsLoading(false);    
        }
    }catch(e){
        console.log(e);
        setError("Some unexpected error occurred!");
        setShopDetailsLoading(false);
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
        getShop(user);
        getUserCurrency(user);
    }
  },[]);

  useEffect(() => {
    let totalSalesLocal = 0;
    items.map((eachItem)=>{
        totalSalesLocal+=eachItem.salesCount*eachItem.price;
    })
    setTotalSales(totalSalesLocal);
  },[items]);

  return (
    <div>
      {!shopDetailsLoading && <div>
            <div><span className="view_profile_header">Shop Home</span></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <div><img className="profile_picture"></img></div>
                        {editRights && <div><FontAwesomeIcon icon={faCamera}/></div>}
                    </div>
                    <div className="viewprofile_username col-md-4 col-sm-12">
                        <div>{shop && shop.name}</div>
                        <div className="row">
                            <div className="viewprofile_userdob col-md-12 col-sm-12">
                                Test Details
                            </div>
                        </div>
                    </div>
                    <div className="viewprofile_username col-md-4 col-sm-12">
                        <div className="row">
                            <div className="col-md-2 col-sm-12">
                                <div><img className="profile_picture"></img></div>
                            </div>
                            <div className="viewprofile_useremail col-md-12 col-sm-12">
                                {shop && shop.ownerName}
                            </div>
                            <div className="viewprofile_useremail col-md-12 col-sm-12">
                                {shop && shop.ownerEmail}
                            </div>
                            <div className="viewprofile_useremail col-md-12 col-sm-12">
                                {shop && shop.ownerPhone}
                            </div>
                            <div className="viewprofile_useremail col-md-12 col-sm-12">
                                {"Total Sales: "+totalSales}
                            </div>
                        </div>
                    </div>
                   <div>
                    {!shopDetailsLoading && editRights &&
                        <AddShopItem currency={currency} setItems={setItems} items={items} id={shop.id}/>
                    }
                    </div>
                    <div>
                        {items && items.length && items.map((eachItem,index)=>{
                            return <Item editRights={editRights} currency={currency} key={eachItem.id} index={index} setItems={setItems} items={items}/>
                        })}
                    </div>
                </div>
            </div>
        </div>}
        {shopDetailsLoading && <span><LoadingIcons.ThreeDots height="5px" width="30px" stroke="black" fill="black"/></span>}
        <MainFooter currency={currency} setCurrency={setCurrency}/>
    </div>
  )
}

export default ShopHome