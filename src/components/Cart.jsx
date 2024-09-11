import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Link, useNavigate } from 'react-router-dom';


function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalAmount } = useContext(CartContext);
  const [isEditing, setIsEditing] = useState(false)


  const navigate = useNavigate();

  const conversionRate = 82;

  console.log("Cart Items in Cart Component:", cartItems);

  if (!cartItems) {
    return <h2>Loading cart...</h2>;
  }
  console.log('Cart Items:', cartItems);

  if(cartItems.length === 0){
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="container mt-4">
        
        <h1 className="mb-4">Your Cart</h1>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-info" onClick={() => navigate('/')}>Go to Home Page</button>
        </div>
        <div className="row">
            {
              cartItems.map((item,index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="row no-gutters">
                      {/* Image Column */}
                      <div className="col-md-7">
                        <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                              <img src={item.image}
                                  alt={item.title}
                                  className="card-img-top mb-3" 
                                  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}/>
                          </div>
                    </div>        
                    {/* Details Column */} 
                    <div className="col-md-8">         
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">₹{item.price ? (item.price * conversionRate).toFixed(2) : '0.00'}</p>

                      {isEditing ? (
                      <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button className="btn btn-danger ms-2"  onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                       ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">Quantity: {item.quantity}</p>
                          <div>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)} >Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                          </div>
                        </div>
                       )}
                    </div>
                </div>
                </div>
                </div>
                </div>
              ))
            }
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-end">
            <h4 className="mb-2">Total Amount</h4>
            <h4>₹{totalAmount ? (totalAmount * conversionRate).toFixed(2) : '0.00'}</h4>
            <div className="mt-3">
              <button className="btn btn-danger me-2" onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart