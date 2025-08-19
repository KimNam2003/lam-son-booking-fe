import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginService } from "../services/api/authService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getMe } from "../services/api/user.api";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // lấy hàm login từ context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginService(email, password);
      const userData = await getMe(data.access_token);
      console.log("user", userData); // gọi getMe với token

      // 2. lưu vào context
      await login(data.access_token, userData);

      // 3. điều hướng theo role
      if (userData.role === "doctor") {
        navigate("/bac-si/trang-chu");
      } else if (userData.role === "patient") {
        navigate("/");
      } else {
        setError("Role không hợp lệ");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-[#a1c4fd] via-[#c2e9fb] to-[#fbc2eb] shadow-lg rounded-xl p-8">
        {/* Left: Logo Image */}
        <div className="flex items-center justify-center">
          <img src="/src/assets/logo.png" className="w-80 h-auto object-contain" />
        </div>

        {/* Right: Sign In Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && <div className="text-red-600 text-center mb-3">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                  <span>Remember me</span>
                </label>

                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 rounded-md font-medium shadow hover:opacity-90 transition"
              >
                Sign in
              </button>

              <p className="text-sm text-gray-600 text-center">
                Don’t have an account?{" "}
                <Link to="/dang-ky" className="text-indigo-600 font-medium hover:underline">
                  Sign up
                </Link>
              </p>

              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-sm text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
