
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  
  return (
    <>
      
      <Routes>
        <Route path='/' element = {<ProductList/>} />
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/product/:id' element = {<ProductDetails/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/checkout' element = {<Checkout/>} />
      </Routes>
     
    </>
  )
}

export default App
