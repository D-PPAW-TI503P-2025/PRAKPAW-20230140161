import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage (jika disimpan saat login)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 mt-10">
        <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>

        <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold">Selamat datang!</h2>
          <p className="mt-1 text-gray-600">
            {user ? (
              <>
                Anda login sebagai <span className="font-bold">{user.name}</span> dengan role
                <span className="font-bold"> {user.role}</span>.
              </>
            ) : (
              "Memuat data..."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Menu 1</h3>
            <p className="text-sm text-gray-600">Contoh fitur atau navigasi.</p>
          </div>

          <div className="bg-white p-4 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Menu 2</h3>
            <p className="text-sm text-gray-600">Tambahkan menu lain sesuai kebutuhan.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}