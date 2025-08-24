import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Cart() {
  // const [cartItems, setCartItems] = useState([]);
  const { cartItems, updateQty, removeFromCart, fetchCart } = useCart();
  const { user } = useAuth();

  // Fetch cart items when component loads
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, []);

  // Totals
  const totalItems = cartItems.reduce((acc, item) => acc + item?.qty, 0);
  const totalPrice = cartItems?.reduce((acc, item) => acc + item?.product?.price * item?.qty, 0) || 0;


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">
          Your cart is empty.{" "}
          <Link to="/products" className="text-blue-600 hover:underline">
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow rounded-lg p-4"
                >
                  <img
                    src={`http://localhost:5000${item?.product?.image}`}
                    alt={item.name}
                    className="w-24 h-24 sm:w-20 sm:h-20 rounded mb-2 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold">{item?.product?.name}</h3>
                    <p className="text-gray-600">${item?.product?.price?.toFixed(2)}</p>
                  </div>

                  {/* Quantity selector */}
                  <select
                    value={item.qty}
                    onChange={(e) => updateQty(item?.product._id, e.target.value)}
                    className="border rounded px-2 py-1 mb-2 sm:mb-0 sm:mr-4"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item?.product?._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">No items in cart</p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4 text-center md:text-left">Order Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice?.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="block mt-4 bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-500"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
