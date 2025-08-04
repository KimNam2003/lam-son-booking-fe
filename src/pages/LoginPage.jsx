export default function Login() {
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

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                <a href="#" className="text-indigo-600 font-medium hover:underline">
                  Sign up
                </a>
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
