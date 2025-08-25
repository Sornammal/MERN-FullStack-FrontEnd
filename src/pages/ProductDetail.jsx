import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchHomeDataService } from "../services/homeService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { user } = useAuth();
  const {addToCart} = useCart()

  const { id } = useParams(); // get product id from URL

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchHomeDataService();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Find product by id (make sure both sides are strings)
  const product = products.find((p) => String(p._id) === String(id));

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  // Handle add to cart using service (API-based)
  // const handleAddToCart = async () => {
  //   try {
  //     await addToCartService({ ...product, qty });
  //     alert("Added to cart!");
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     alert("Failed to add to cart.");
  //   }
  // };

  const handleAddToCart = async () => {
    try {
      if (user) {
        await addToCart(product,qty);
        alert("Added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add to cart.");
    }
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-700">
            {product?.description || `This is a detailed description of ${product?.name}.`}
          </p>
          <p className="text-2xl font-semibold text-blue-600">
            ${product?.price?.toFixed(2)}
          </p>

          {/* Quantity Selector */}
          {product?.countInStock > 0 ? (
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded px-3 py-2"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-red-500 font-medium">Out of Stock</p>
          )}

          {/* Add to Cart */}
          <button
            disabled={product?.countInStock === 0}
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 disabled:bg-gray-400"
          >
            Add to Cart
          </button>

          {/* Back to Products */}
          <div>
            <Link to="/products" className="text-blue-600 hover:underline">
              &larr; Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
