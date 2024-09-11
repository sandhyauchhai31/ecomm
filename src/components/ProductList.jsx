import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default')

    const categories = ['all','men\'s clothing', 'women\'s clothing', 'jewelery']

    const conversionRate = 82;

    function fetchProducts() {
        axios
        .get('https://fakestoreapi.com/products')
        .then(function (response) {
            setProducts(response.data);
            setLoading(false);
        })
        .catch(function (error) {
            console.error('Error fetching products:', error);
        });
    }

    useEffect(function(){
        fetchProducts() 
        }, []);

    useEffect(function(){
        console.log('Filtering products, selectedCategory:', selectedCategory);
        let updatedProducts = [...products];

        if (selectedCategory !== "all") {
            updatedProducts = products.filter(product => product.category === selectedCategory);
        }

        if (sortOption === 'priceLowToHigh') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceHighToLow') {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);

    },[selectedCategory,products, sortOption])

    

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container mt-4">
        <h1 className="mb-4">Products</h1>

        <div className="row mb-4">
            <div className="col-6">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-select" >
                    {categories.map(category =>(
                        <option key={category} value={category}>
                            {category === 'all' ? 'All categories' : category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-6 text-end">
                <select className='form-select' value = {sortOption} onChange={(e)=>setSortOption(e.target.value)}>
                    <option value="default">Sort by: Default</option>
                    <option value="priceLowToHigh">Price Low to High</option>
                    <option value="priceHighToLow">Price High to Low</option>           
                </select>
            </div>
        </div>

        
        <div className="row">
            {
                filteredProducts.length > 0 ? (
                    filteredProducts.map(product =>(
                <div key={product.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                            <img src={product.image} alt={product.title} className="card-img-top mb-3" style={{ maxHeight: '200px', objectFit: 'cover' , width: '100%',height: '100%'}} />
                        </div>
                    <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="card-text">₹{product.price ? (product.price * conversionRate).toFixed(2) : '0.00'}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">View Details</Link>
                </div>
            </div>
        </div>
        ))
    ) : (
        <p style={{color : "red"}}>No products available for the selected category!</p>
    )}
    </div>
</div>
);
};

export default ProductList;
