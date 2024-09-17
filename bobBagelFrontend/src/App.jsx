
import productsList from "../../inventory.json"
import './App.css'
import { useEffect, useState } from 'react'
import AddProduct from "./AddProduct"
import BasketComponent from "./BasketComponent"

function App() {
  const [products, setProducts] = useState([])
  const [capacity, setCapacity] = useState(5)
  const [basket, setBasket] = useState([])

  console.log(basket)
  useEffect(() => {
    setProducts(productsList.inventory)
  }, [])
  

  const getName = (product) => {
    return product.fillings ? `${product.variant} ${product.name} with ${product.fillings.join(", ")}` : `${product.variant} ${product.name}`
  }


  return (
    <>
      <div className="container d-flex justify-content-between gap-5">
        <AddProduct productList={products} getName={ getName } capacity={capacity} basket={basket} setBasket={setBasket}/>
        <BasketComponent capacity={capacity} setCapacity={setCapacity} basket={basket} setBasket={setBasket} getName={getName} />
      </div>

    </>
  )
}

export default App
