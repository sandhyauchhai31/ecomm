import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);


    const addToCart = (product) => {
        setCartItems((prevItems) =>{
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1 } : item 
                )
            }else {
                return[...prevItems, { ...product, quantity: 1 }]
            }
        })  
    }

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        })
    }

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            return prevItems.filter(item => item.id !== id)
        })
    }

    const clearCart = () => {
        setCartItems([])
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


    // useEffect(() => {
    //     console.log("Cart Items after update:", cartItems);
    // }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount }}>
            { children }
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider}