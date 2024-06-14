import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Blogs from './pages/Blogs'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import BlogPage from './pages/BlogPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndCond from './pages/TermsAndCond'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Payment from './pages/Payment'
import Orders from './pages/Orders'
import OrderPlaced from './pages/OrderPlaced'
import { ProtectedRoutes } from './routes/ProtectedRoutes'
import { OpenRoutes } from './routes/OpenRoutes'
import OrderedItems from './pages/OrderedItems'
import Profile from './pages/Profile'
import CategoryWiseProduct from './pages/CategoryWiseProduct'


function App() {
  return <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='shop/:category' element={<CategoryWiseProduct/>} />
          <Route path='product/:id' element={<ProductPage/>}/>
          <Route path='blogs' element = {<Blogs/>} /> 
          <Route path='blog/:id' element = {<BlogPage/>} />
          <Route path='contact' element = {<Contact/>} />
          <Route path='wishlist' element = {<Wishlist/>} />
          <Route path='login' element = {<OpenRoutes><Login/></OpenRoutes>} />
          <Route path='forgot-password' element = {<ForgotPassword/>} />
          <Route path='signup' element = {<OpenRoutes><Signup/></OpenRoutes>} />
          <Route path='reset-password/:token' element = {<ResetPassword/>} />
          <Route path='privacy-policy' element = {<PrivacyPolicy/>} />
          <Route path='terms&conditions' element = {<TermsAndCond/>} />
          <Route path='refund-policy' element = {<RefundPolicy/>} />
          <Route path='shipping-policy' element = {<ShippingPolicy/>} />
          <Route path='cart' element = {<ProtectedRoutes><Cart/></ProtectedRoutes>} />
          <Route path='checkout' element = {<ProtectedRoutes><CheckOut/></ProtectedRoutes>} />
          <Route path='payment' element = {<ProtectedRoutes><Payment/></ProtectedRoutes>} />
          <Route path='my-orders' element = {<ProtectedRoutes><Orders/></ProtectedRoutes>} />
          <Route path='order-items/:id' element={<ProtectedRoutes><OrderedItems/></ProtectedRoutes>} />
          <Route path='/my-profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />
          <Route path='orderplaced' element={<ProtectedRoutes><OrderPlaced/></ProtectedRoutes>} />
        </Route>
               
      </Routes>
    </BrowserRouter>
  </>
}

export default App