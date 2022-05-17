import React,{useState, useEffect} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {InputGroup, FormControl, Button, Modal, Form} from 'react-bootstrap';
import {axiosInstance as authapi} from '../services/authpost';
import {useNavigate, Link} from "react-router-dom";
import '../styles/mainfooter.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { getCountries } from "../redux/actions/actions.js";
import { getCurrencies } from "../redux/actions/actions.js";

const UPDATE_USER_CURRENCY = "api/user/currency/update";


const ConnectedMainFooter = ({currency,setCurrency,getCountries,getCurrencies,countries,currencies}) => {
  const navigate = useNavigate();
  const [gettingCurrencies,setGettingCurrencies] = useState(true);
  const [error, setError] = useState("");
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));


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
    setCurrency(currencyObj);
  }

  useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user){
            navigate("/login", {replace:true});
        }else{
            getCurrencies();
            getCountries();
        }
    },[]);

    useEffect(() => {
        changeUserCurrency();
    },[currency]);

  return (
    <MDBFooter  style={{backgroundColor: "#232347",color: "white"}} className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="4">
            <div>{countries && countries.length && countries.filter((eachCountry)=>{return user.country===eachCountry.id}) && countries.filter((eachCountry)=>{return user.country===eachCountry.id})[0] && countries.filter((eachCountry)=>{return user.country===eachCountry.id})[0].name}</div>
          </MDBCol>
          <MDBCol md="4">
            <Form.Group className="mb-3">
                <Form.Label className="currency-drpdwn-label">Currency</Form.Label>
                <Form.Select className="currency-drpdwn" size="sm" name="currency" id="currency" value={currency && currency.id} onChange={changeCurrency}>
                    <option value="">Select Currency</option>
                    {currencies && currencies.length &&
                        currencies.map((eachCurrency,index)=>{
                            return <option key={index} value={eachCurrency.id}>{eachCurrency.name}</option>
                        })
                    }
                </Form.Select>
            </Form.Group>
          </MDBCol>
          <MDBCol md="4">
              <MDBContainer>
                &copy; {new Date().getFullYear()} Copyright: <Link className="link__white" to="/home"> Etsy </Link>
              </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getCountries: () => dispatch(getCountries()),
    getCurrencies: () => dispatch(getCurrencies()),
  };
}


const mapStateToProps = state => {
  return { 
    countries: state.countries,
    currencies: state.currencies
   };
};

const MainFooter = connect(mapStateToProps,mapDispatchToProps)(ConnectedMainFooter);

export default MainFooter;