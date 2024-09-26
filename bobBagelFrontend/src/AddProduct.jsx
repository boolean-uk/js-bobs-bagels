/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

export default function AddProduct({ productList, capacity, getName, basket, setBasket }) {
    const [selectedValue, setSelectedValue] = useState("")

    const addToBasket = (productSKU) => {
        const amountOfProducts = basket.map((product)=>product.quantity).reduce((x,y)=>x+y,0)
        if (amountOfProducts < capacity) {
          const product = productList.find((product) => product.sku === productSKU)
          setBasket((prevBasket) => {
            const existingProduct = prevBasket.find((item) => item.sku === product.sku);
            if (existingProduct) {
              return prevBasket.map((item) =>
                item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              return [...prevBasket, { ...product, quantity: 1 }];
            }
          });
        } else {
          alert('Basket is full. Cannot add more items.');
        }
    };
    console.log(basket)
  return (
      <>
          <div className="container option add">
            <select name="products" className='form-select' value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)}>
                <option value="">Select a product</option>
                {productList && productList.map((product) => {
                    return <option key={product.sku} value={product.sku}>{ `${getName(product)} : $${product.price} ` }</option>
                })}
            </select>
            <button className='mt-4 btn btn-secondary' onClick={()=>addToBasket(selectedValue)}>add Product</button>
          </div>

    </>
  )
}
