import React from 'react';
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import {axiosInstance as authapi} from '../services/authpost';
import HomeItem from './HomeItem';
import { Form, Button } from 'react-bootstrap';
import '../styles/home.css';
import 'bootstrap/dist/css/bootstrap.css';

const GET_OTHER_ITEMS_API = "api/item/other";
const GET_OTHER_ITEMS_FILTER_API = "api/item/other/filter";
const GET_USER_CURRENCY_API = "api/currency/";
const GET_USER_SHOP_API = "/api/shop/user/";


const Home = ({searchQuery,setSearchQuery}) => {
  const navigate = useNavigate();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy,setSortBy] = useState("");
  const [inStock,setInStock] = useState(false);
  const [currency,setCurrency] = useState({});
  const [gettingCurrency, setGettingCurrency] = useState(true);
  const [shop,setShop] = useState({});
  const [shopLoading,setShopLoading] = useState(true);

  const getOtherItems = async ()=>{
    setItemsLoading(true);
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await authapi.post(GET_OTHER_ITEMS_API,user);
      if(response && response.data){
          if(response.data.success){
              const items = response.data.items;
              setItems(items);
              setItemsLoading(false);
          }else{
              setErrorMsg("Some unexpected error occurred!");
              setItemsLoading(false);
          }
      }else{
          setErrorMsg("Some unexpected error occurred!");
          setItemsLoading(false);
      }
    }catch(err){
        if(err && err.response && err.response.data && err.response.data.error){
            setErrorMsg(err.response.data.error);
        }
        setItemsLoading(false);
    }
  }

  const getOtherFilterItems = async ()=>{
    setItemsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const filterData = {};
    filterData.searchQuery = searchQuery;
    filterData.minPrice = minPrice;
    filterData.maxPrice = maxPrice;
    filterData.inStock = inStock;
    filterData.sortBy=sortBy;
    filterData.shop = shop.id;
    filterData.userId = user.id;
    try{
      const response = await authapi.post(GET_OTHER_ITEMS_FILTER_API,filterData);
      if(response && response.data){
          if(response.data.success){
              const items = response.data.items;
              setItems(items);
              setItemsLoading(false);
          }else{
              setErrorMsg("Some unexpected error occurred!");
              setItemsLoading(false);
          }
      }else{
          setErrorMsg("Some unexpected error occurred!");
          setItemsLoading(false);
      }
    }catch(err){
        if(err && err.response && err.response.data && err.response.data.error){
            setErrorMsg(err.response.data.error);
        }
        setItemsLoading(false);
    }
  }

  const getUserCurrency = async ({currency})=>{
    setGettingCurrency(true);
      try{
          const response = await authapi.get(GET_USER_CURRENCY_API+currency);
          if(response && response.data){
              if(response.data.success){
                setCurrency(response.data.currency);
                setGettingCurrency(false);
              }else{
                console.log(response);
                setGettingCurrency(false);
              }
          }else{
              console.log(response);
              setGettingCurrency(false);
          }
      }catch(err){
        console.log(JSON.stringify(err));
        setGettingCurrency(false);
      }
  }

  const getUserShop = async ()=>{
    setShopLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id; 
    try{
        const response = await authapi.get(GET_USER_SHOP_API+userId);
        if(response && response.data && response.data.success && response.data.shopFound){
            setShop(response.data.shop);
            setShopLoading(false);
        }else{
            console.log("Some unexpected error occurred");
            setShopLoading(false);    
        }
    }catch(e){
        console.log(e);
        setShopLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if(!token || !user){
        navigate("/login", {replace:true});
    }else{
      getUserCurrency(user);
      getUserShop();
      if(searchQuery && searchQuery.length){
        getOtherFilterItems();
      }else{
        getOtherItems();
      }
    }
  },[]);


  return (
    <div>
      <MainNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} getOtherFilterItems={getOtherFilterItems} setItems={setItems}/>
      <div className="home_body">
         <div className="filterbox">
          <Form.Group>
            <div className="filter-row">
              <span className="filter-col">
                <Form.Label size="sm" className="price-label" htmlFor="minprice">Price</Form.Label>
                <Form.Control size="sm" className="price-filter" value={minPrice} onChange={(e)=>{setMinPrice(e.target.value)}}  type="number" id="minprice" name="minprice" placeholder="Low"/>
                <Form.Label size="sm" className="price-label" htmlFor="maxprice">To</Form.Label>
                <Form.Control size="sm" className="price-filter" value={maxPrice} onChange={(e)=>{setMaxPrice(e.target.value)}} type="number" id="maxprice" placeholder="High"/>
              </span>
              <span className="filter-col">
                <Form.Label htmlFor="sort-homeitem" size="sm">Sort By: </Form.Label>
                <Form.Select size="sm" className="sort-filter" value={sortBy} onChange={(e)=>{setSortBy(e.target.value)}} id="sort-homeitem" name="sort-homeitem">
                  <option value="">Relevancy</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                  <option value="salesCount">Sales Count</option>
                </Form.Select>
              </span>
              <span className="filter-col">
                <Form.Check size="sm" className="exclude-filter" value={inStock} onChange={(e)=>{setInStock(e.target.checked)}} type="checkbox" label="Show in stock items only" />
              </span>
              <span className="filter-col">
                <Button size="sm" className="filter-button" onClick={getOtherFilterItems}>Filter</Button>
              </span>
            </div>
          </Form.Group>
        </div>
        <div className="home-items-container">
        {
          !gettingCurrency && !itemsLoading && items && items.map((eachItem,index)=>{
            return <HomeItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} getOtherFilterItems={getOtherFilterItems} setItems={setItems} gettingCurrency={gettingCurrency} itemsLoading={itemsLoading} currency={currency} key={eachItem.id} setItems={setItems} items={items} index={index} item={eachItem} />
          })
        }
        {
          !gettingCurrency && !itemsLoading && (!items || !items.length) &&
          <div className="cart-heading">No items to show!</div>
        }
        </div>
      </div>
      {!gettingCurrency && !itemsLoading && <MainFooter currency={currency} setCurrency={setCurrency}/>}
    </div>
  )
}

export default Home