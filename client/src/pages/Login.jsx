import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, SendIcon } from "lucide-react";
import Loader from '../components/Loader.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]:e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <SendIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="form-control">
              <label className="input validator w-full">
                <MailIcon className="size-6 opacity-50"/>
                <input 
                  type="email" 
                  name="email"
                  autoComplete="email webauthn"
                  placeholder="your@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required />
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>
            </div>

            <div className="form-control">
              <label className="input validator w-full">
              <LockIcon className="size-6 opacity-50"/>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password webauthn"
                  required
                  placeholder="password"
                  minLength="6"
                  title="Password is required."
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <p className="validator-hint hidden">
                Password is required
              </p>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader size="loading-xs"/>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title="Good to see you again"
        subtitle="Jump back into your chats."
        unique={true}
      />
    </div>
  );
};
export default Login;