"use client";

import { useCartStore } from "../api/Carssotres";

export default function ProductPage() {
  const { cart, addToCart, removeFromCart, updateQty, clearCart } =
    useCartStore();

  const sampleProduct = {
    id: 1,
    name: "Demo Product",
    price: 100,
    qty: 1,
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Products</h1>
      <button
        onClick={() => addToCart(sampleProduct)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>

      <h2 className="mt-4 text-lg">Cart Items:</h2>
      {cart.length === 0 && <p>🛒 Cart is empty</p>}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mt-2">
          <span>
            {item.name} - {item.qty} × {item.price} ={" "}
            {item.qty * item.price}৳
          </span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="bg-green-500 px-2 py-1 text-white rounded"
          >
            +
          </button>
          <button
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="bg-yellow-500 px-2 py-1 text-white rounded"
            disabled={item.qty <= 1}
          >
            -
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 px-2 py-1 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

