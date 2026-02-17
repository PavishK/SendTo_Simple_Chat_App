import { LockIcon, MailIcon, SendIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import Loader from '../components/Loader.jsx';

function Register() {
  const [ formData, setFormData ] = useState({
    fullname: "",
    email: "",
    password: "",
    profilepic: ""
  });
  const { register, isRegistering } = useAuthStore();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    register(formData);
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <SendIcon className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="form-control">
              <label className="input validator w-full">
                <UserIcon className="size-6 opacity-50" />
                <input
                  type="text"
                  name='fullname'
                  autoComplete='username webauthn'
                  required
                  placeholder="eren yeager"
                  pattern="[A-Za-z]{3,}(?:\s[A-Za-z]{1,20})?"
                  minLength={3}
                  maxLength={24}
                  title="Enter first name (min 3 letters). Optional last name (max 20 letters). Letters only, single space allowed."
                  value={formData.fullname}
                  onChange={handleInputChange}
                />

              </label>
              <p className="validator-hint hidden">
                Must contain a first name (minimum 3 letters)
                <br />
                Optional last name (maximum 20 letters)
                <br />
                Letters only, single space allowed
                <br />
                Example: <strong>eren</strong> or <strong>eren yeager</strong>
              </p>

            </div>


            <div className="form-control">
              <label className="input validator w-full">
                <MailIcon className='size-6 opacity-50'/>
                <input 
                  type="email" 
                  name='email'
                  autoComplete='email webauthn'
                  placeholder="eren.yeager@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required />
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>
            </div>

            <div className="form-control">
              <label className="input validator w-full">
                <LockIcon className="size-6 opacity-50" />
                <input
                  type="password"
                  name='password'
                  autoComplete='current-password webauthn'
                  required
                  placeholder="Eren.Yeager01"
                  minLength={6}
                  maxLength={12}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"
                  title="6–12 characters, including at least 1 number, 1 lowercase and 1 uppercase letter"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <p className="validator-hint hidden">
                Must be 6–12 characters
                <br />At least one number
                <br />At least one lowercase letter
                <br />At least one uppercase letter
              </p>
            </div>


            <button type="submit" className="btn btn-primary w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader size='loading-xs'/>
                  Loading...
                </>
              ) : (
                "Sign up"
              )}

            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
      {/* right side */}

      <AuthImagePattern
        title="Join now"
        subtitle="Set up your account and start chatting."
        unique={false}
      />

    </div>
  )
}

export default Register