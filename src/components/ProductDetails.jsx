import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { CartContext } from "../context/CartContext";



function ProductDetails() {

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const conversionRate = 82;

    useEffect(function(){
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(response => {
            setProduct(response.data);
            setLoading(false)
        })
        .catch(error => {
            console.log('Error fetching product details:', error);
        });
    },[id])

    if (loading) {
        return <h2>Loading product details...</h2>;
    }

    function handleAddToCart(product){
        console.log(product)
        addToCart(product);
        navigate('/cart');
    }
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <img src={product.image} alt={product.title} className="img-fluid card-img-top" style={{ maxHeight: '500px', objectFit: 'contain', padding: '20px' }}/>
                </div>
            </div>
            <div className="col-md-6">
                <h2 className="mb-3">{product.title}</h2>
                <p className="lead">Category: {product.category}</p>
                <h4 className="text-success mb-4">Price: ₹{(product.price * conversionRate).toFixed(2)}</h4>
                <p className="mb-4">{product.description}</p>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default ProductDetails