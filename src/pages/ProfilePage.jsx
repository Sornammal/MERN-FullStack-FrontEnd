import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProfilePage() {
  const { user, logout } = useAuth();

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
