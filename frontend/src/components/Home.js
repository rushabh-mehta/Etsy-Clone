import React from 'react'
import api from '../services/authpost';
 
const testHomeCall = async ()=>{
    // make AXIOS api call
    const response = await api.post('/api/home/',{});
    console.log("Frontend"+response);
}

const Home = () => {
  testHomeCall();
  return (
    <div>Home</div>
  )
}

export default Home