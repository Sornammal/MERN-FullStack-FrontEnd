import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchHomeDataService } from "../services/homeService";
function Products() {
  // State for search and filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  // Fetch products from backend
    useEffect(() => {
      fetchProducts();
    }, []);
    const fetchProducts = async () => {
      const response = await fetchHomeDataService();
      setProducts(response.data);
    }

 
  // setFilteredProducts(filteredProducts);
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Products</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            // <div>{product.name}</div>
            <div
              key={product?.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{product?.name}</h3>
              <p className="text-gray-600">${product?.price?.toFixed(2)}</p>
              <Link
                to={`/products/${product?._id}`}
                className="mt-3 inline-block text-sm text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
