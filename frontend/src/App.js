import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import ShopCreate from './components/ShopCreate';
import ShopHome from './components/ShopHome';

function App() {
  return (
    <Routes>
        <Route exact path="register" element={<Register/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="home" element={<Home/>}/>
        <Route exact path="view-profile" element={<ViewProfile/>}/>
        <Route exact path="edit-profile" element={<EditProfile/>}/>
        <Route exact path="shop/create" element={<ShopCreate/>}/>
        <Route exact path="shop/home" element={<ShopHome/>}/>
        <Route exact path="/" element={<Home/>}/>
    </Routes>
  );
}

export default App;
