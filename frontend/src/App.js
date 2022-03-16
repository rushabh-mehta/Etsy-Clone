import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import ShopCreate from './components/ShopCreate';
import ShopHome from './components/ShopHome';
import ItemOverview from './components/ItemOverview';
import Cart from './components/Cart';
import Orders from './components/Orders';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Routes>
        <Route exact path="register" element={<Register/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="home" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route exact path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route exact path="view-profile" element={<ViewProfile searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route exact path="edit-profile" element={<EditProfile searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route exact path="shop/create" element={<ShopCreate/>}/>
        <Route exact path="shop/home/:shopId" element={<ShopHome/>}/>
        <Route exact path="item/overview/:id" element={<ItemOverview/>}/>
        <Route exact path="cart" element={<Cart searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route exact path="orders" element={<Orders searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
    </Routes>
  );
}

export default App;
