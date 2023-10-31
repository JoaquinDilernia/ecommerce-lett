import React from 'react'
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext([]);

export const ShoppingCartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [cartQty, setCartQty] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://apimocha.com/lettproduct/products")
          .then((response) => response.json())
          .then((json) => setProducts(json));
      }, []);

      


      
    
    const cleanCart = () => {
        setCartQty(0);
        setCart([]);
        setTotalAmount(0);
      };
    
      const findProduct = (id, array) => array.find((product) => product.id === id);
    
      function substractAmount(price) {
        let amount = totalAmount;
        amount -= price;
        setTotalAmount(amount);
      }
    
      function substractQty() {
        if (cartQty > 0) {
          setCartQty(cartQty - 1);
        }
      }
    
      function cartIsEmpty() {
        let empty = false;
        for (let index = 0; index < cart.length; index++) {
          if (cart[index].quantity === 0 && cart.length <= 1) {
            empty = true;
          }
        }
        return empty;
      }
    
      const removeProduct = (id) => {
        let itemInCart = findProduct(id, cart);
        let quantity = itemInCart.quantity--;
        let posInCart = cart.indexOf(itemInCart);
        let newCart = cart.filter((product) => product.id !== id);
        substractQty();
        if (cart[posInCart].quantity === 0) {
          setCart(newCart);
        } else {
          setCart([...newCart, { ...itemInCart, quantity: quantity - 1 }]);
        }
        if (cart.length > 0 && totalAmount > 0) {
          substractAmount(itemInCart.price);
        }
        let cartEmpty = cartIsEmpty();
        if (cartEmpty) {
          cleanCart();
        }
      };
    
      function addAmount(price, quantity) {
        let amount = totalAmount;
        amount += price * quantity;
        setTotalAmount(amount);
      }
    
      const addItem = (quantity, id) => {
        let total = cartQty;
        let newCart;
        let item = findProduct(id, products);
        let product = cart.find((product) => product.id === item.id);
        if (product) {
          product.quantity += quantity;
          newCart = [...cart];
        } else {
          newCart = [...cart, { ...item, quantity: quantity }];
        }
        total += quantity;
        setCart(newCart);
        setCartQty(total);
        addAmount(item.comercio, quantity);
      };
    
    return (
        <CartContext.Provider
        value={{
          cleanCart,
          findProduct,
          removeProduct,
          addItem,
          cart,
          setCart,
          cartQty,
          totalAmount,
          addAmount,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}

export default ShoppingCartProvider;
