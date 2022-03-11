import React,{useState, useEffect} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {InputGroup, FormControl, Button, Modal, Form} from 'react-bootstrap';
import authapi from '../services/authpost';
import {useNavigate} from "react-router-dom";

const GET_CURRENCIES_API = "/api/currency/";
const UPDATE_USER_CURRENCY = "api/user/currency/update";


const MainFooter = ({currency,setCurrency}) => {
  const navigate = useNavigate();
  const [currencies,setCurrencies] = useState([]);
  const [gettingCurrencies,setGettingCurrencies] = useState(true);
  const [error, setError] = useState("");
  
  const getCurrencies = async () => {
      setGettingCurrencies(true);
      try{
          const response = await authapi.get(GET_CURRENCIES_API);
          if(response && response.data && response.data.success && response.data.currencies){
              setCurrencies(response.data.currencies);
              setGettingCurrencies(false);
          }else{
              setError("Some unexpected error occurred!");
              setGettingCurrencies(false);
          }
      }catch(e){
          console.log(e);
          setError("Some unexpected error occurred!");
          setGettingCurrencies(false);
      }
  }

  const changeUserCurrency = async ()=>{
    if(currency && currency.id && currency.name){
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {};
      data.userId = user.id;
      data.currencyId = currency.id;
      try{
            const response = await authapi.post(UPDATE_USER_CURRENCY,data);
            if(response && response.data && response.data.success){
              user.currency = currency.id;
              localStorage.setItem("user",JSON.stringify(user));
            }else{
                setError("Some unexpected error occurred!");
            }
      }catch(e){
          console.log(e);
          setError("Some unexpected error occurred!");
      }
    }
  }

  const changeCurrency =  (e)=>{
    const selectedCurrency = currencies.filter((eachCurrency)=>{
      return eachCurrency.id == e.target.value;
    })
    const currencyObj = selectedCurrency[0];
    console.log(currencyObj);
    setCurrency(currencyObj);
  }

  useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getCurrencies();
            setCurrency(user.currency);
        }
    },[]);

    useEffect(() => {
        changeUserCurrency();
    },[currency]);

  return (
    <MDBFooter color="pink" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select name="currency" id="currency" value={currency && currency.id} onChange={changeCurrency}>
                    <option value="">Select Currency</option>
                    {currencies && currencies.length &&
                        currencies.map((eachCurrency,index)=>{
                            return <option key={index} value={eachCurrency.id}>{eachCurrency.name}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>
          </MDBCol>
          <MDBCol md="6">
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="/home"> Etsy </a>
              </MDBContainer>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default MainFooter;