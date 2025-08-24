import { useState } from "react";
import { useCart } from "../context/CartContext"; // your cart context

function Checkout() {
  // Get cart items from context instead of hardcoding
  const { cartItems } = useCart();

  const totalItems = cartItems?.reduce((acc, item) => acc + item?.qty, 0) || 0;
  const totalPrice = cartItems?.reduce((acc, item) => acc + item?.product?.price * item?.qty, 0) || 0;

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before checking out.");
      return;
    }
    console.log("Order placed:", form, cartItems);
    alert("Order placed successfully!");
    // You can also call an API here to save the order
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty. Add items to checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="md:col-span-2 bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Shipping */}
        <h2 className="text-lg font-semibold">Shipping Information</h2>
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required className="w-full border rounded px-4 py-2" />

        {/* Payment */}
        <h2 className="text-lg font-semibold mt-6">Payment Method</h2>
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border rounded px-4 py-2">
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="PayPal">PayPal</option>
        </select>

        <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 w-full">
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="divide-y">
          {cartItems.map((item) => (
            <li key={item._id} className="py-2 flex justify-between">
              <span>
                {item?.product?.name} x {item?.qty}
              </span>
              <span>${(item?.product?.price * item?.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <p className="font-semibold">Total Items: {totalItems}</p>
        <p className="font-bold text-blue-600 text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Checkout;
