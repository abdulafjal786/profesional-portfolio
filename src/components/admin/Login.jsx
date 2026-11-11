import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginimage from "../../assets/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ParticleField from "../../three/ParticleField";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: mobile, password }),
    };

    try {
      // const response = await fetch("https://humhai.in/login-app/", requestOptions);
      const response = await fetch(
        "http://192.168.1.11:8000/login-app/",
        requestOptions
      );
      const data = await response.json();

      if (response.status === 200 && data?.status) {
        const user = data.user_data;

        if (user.profile.user_type === 0) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/admin/dashboard");
        } else {
          alert("Access denied: You are not an admin.");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate grid min-h-screen bg-ink text-paper md:grid-cols-2">
      <ParticleField />
      <div className="relative hidden overflow-hidden md:block">
        <img
          src={loginimage}
          alt="Login Visual"
          className="h-full w-full object-cover opacity-70"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink" />
        <p className="absolute bottom-10 left-10 font-display text-4xl font-light">
          Arun <span className="italic text-ember">Prabhu</span>
          <span className="mt-2 block font-sans text-xs uppercase tracking-[0.3em] text-mute">Admin console</span>
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="glass w-full max-w-md rounded-[2rem] bg-ink/60 p-8 sm:p-10">
          <span className="eyebrow">Restricted</span>
          <h2 className="mt-4 mb-8 font-display text-4xl font-light">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="mobile" className="mb-2 block text-sm text-mute">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                autoComplete="username"
                className="w-full rounded-2xl border border-line bg-white/[0.03] px-5 py-3.5 text-paper outline-none transition-colors placeholder:text-dim focus:border-ember/60"
                placeholder="Enter your Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-mute">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-line bg-white/[0.03] px-5 py-3.5 pr-12 text-paper outline-none transition-colors placeholder:text-dim focus:border-ember/60"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-mute hover:text-paper"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
