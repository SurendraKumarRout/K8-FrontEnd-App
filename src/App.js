import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({ product_id: "", quantity: "" });
  const [message, setMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Handle order submission
  const handleOrder = () => {
    if (!order.product_id || !order.quantity) {
      setMessage("Please select a product and quantity.");
      return;
    }

    axios
      .post("http://localhost:5000/orders", order)
      .then((response) => {
        setMessage(`Order placed successfully! Order ID: ${response.data.orderId}`);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setMessage("Failed to place order.");
      });
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>Flipkart Mini</h1>
      </header>

      <section className="product-list">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`https://via.placeholder.com/150?text=${product.name}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => setOrder({ ...order, product_id: product.id })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="order-form">
        <h2>Place Your Order</h2>
        <div className="order-inputs">
          <input
            type="number"
            placeholder="Enter Quantity"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
          />
          <button className="place-order-btn" onClick={handleOrder}>
            Place Order
          </button>
        </div>
        {message && <p className="order-message">{message}</p>}
      </section>

      <footer className="footer">
        <p>&copy; 2025 Flipkart Mini. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
