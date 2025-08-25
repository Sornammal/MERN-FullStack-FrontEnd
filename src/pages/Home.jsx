import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHomeDataService } from "../services/homeService";

function Home() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await fetchHomeDataService();
    setProducts(response.data);
  }
  // Define categories in order
  const categories = ["Clothing", "Electronics", "Home"];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">MyShop</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop shop for amazing products at great prices.
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Products by Category */}
      {
        categories.map((cat) => {
          const filteredProducts = products.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
          if (filteredProducts.length === 0) return null; // don't show empty section
          return (
            <section key={cat} className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{cat}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  // <div>{p.name}</div>
                  <div
                    key={p._id}
                    className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                  >                  
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                       
                        console.log(e);
                      }}
                      className="rounded-md mb-3 w-full h-48 object-cover"
                    />

                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-gray-600">
                      $ {Number(p.price).toFixed(2)}
                    </p>
                    <Link
                      to={`/products/${p._id}`}
                      className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default Home;
