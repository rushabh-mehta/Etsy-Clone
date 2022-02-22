import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViewProfile from './components/ViewProfile';

function App() {
  return (
    <Routes>
        <Route exact path="register" element={<Register/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="home" element={<Home/>}/>
        <Route exact path="view-profile" element={<ViewProfile/>}/>
        <Route exact path="/" element={<Home/>}/>
    </Routes>
  );
}

export default App;
