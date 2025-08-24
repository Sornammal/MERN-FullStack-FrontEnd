import { useState } from "react";

function Profile() {
  // Mock user data (later: fetch from backend)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  // Mock order history
  const orders = [
    { id: "ORD123", date: "2025-08-01", total: 120.5, status: "Delivered" },
    { id: "ORD124", date: "2025-08-10", total: 59.99, status: "Pending" },
  ];

  // State for profile form
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();
    // TODO: Later connect to backend
    setUser({ name: form.name, email: form.email });
    alert("Profile updated successfully! (mock)");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Profile Form */}
      <div className="bg-white shadow rounded-lg p-6 md:col-span-1">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Full Name"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Email"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            placeholder="New Password (optional)"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Order History */}
      <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Order History</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.date}</td>
                  <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
