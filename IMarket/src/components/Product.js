import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dramaket, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)
  const [error, setError] = useState(null)

  const fetchDetails = async () => {
    const events = await dramaket.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await dramaket.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    if (item.stock === 0) {
      setError("This item is currently out of stock and cannot be purchased.")
      return
    }

    const signer = await provider.getSigner()

    // Buy item...
    try {
      let transaction = await dramaket.connect(signer).buy(item.id, { value: item.cost })
      await transaction.wait()

      setHasBought(true)
    } catch (error) {
      setError("This item is currently out of stock and cannot be purchased.")
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Every shopping choice is easy on the DRA-Y decentralized platform. Oh great stuff, Get as much as you can by ordering here. Hope everything can make you comfortable. Now...just buy it
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          {error && (
            <div className="product__error-message">
              {error}
            </div>
          )}

          <button className='product__buy' onClick={buyHandler} disabled={item.stock === 0}>
            Buy Now
          </button>

          <p><small>Ships from</small> Dramaket</p>
          <p><small>Sold by</small> Dramaket</p>

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  )
}

export default Product;
