import React, { useEffect, useState } from 'react'
import { handleLoginWithGoogle } from '../../utils/loginWithGoogle'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { toast } from 'react-toastify'
import { FcGoogle } from "react-icons/fc";

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import fullLogo from '@/assets/images/full-logo.png'
const SignIn = () => {
  const location = useLocation();
  const { callApi } = useApi();
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  // Extract query param ?code=xxxx
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      handleLogin(code);
    }
  }, [code]);

  const submitHandler = (e) => {

    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Verification Code validation (only when shown)


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear all errors
    manualLogin()

  }

  const manualLogin = async () => {
    const data = await callApi({
      method: "POST",
      data: { email, password },
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    });
    if (data?.isSuccess) {
      localStorage.setItem("token", data?.authToken);
      localStorage.setItem("user", JSON.stringify(data?.user));
      toast.success("Sign in successfully!")
      setTimeout(() => {

      })
      navigate("/request-review")
    }
  }

  const handleLogin = async (code) => {
    const data = await callApi({
      method: "POST",
      data: { code },
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/google-signin`,
    });
    if (data?.isSuccess) {
      localStorage.setItem("token", data?.authToken);
      localStorage.setItem("user", JSON.stringify(data?.user));
      toast.success("Sign in successfully!")
      setTimeout(() => {

      })
      navigate("/request-review")
    }
  }

  return (
    <div className="bg-white rounded-lg ">
      <div className="min-h-screen flex flex-col p-6">
        {/* Header */}
        <header className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <img
              src={fullLogo}
              alt="Workflow"
              className="h-11 w-30"
            />
          </div>
         
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <div className="w-full space-y-6">
            <div className="  font-semibold">
              <h1 className="text-2xl ">Your edge on Amazon</h1>
              <p className="text-2xl text-[#b7b7b7] ">Log In to Thread</p>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full text-sm items-center justify-center gap-2 size:6 py-4" onClick={() => handleLoginWithGoogle(`${import.meta.env.VITE_WEB_URL}/signin`)}>
                <FcGoogle size={50} />
                Log in with Google
              </Button>

              <div className="space-y-2 border-t mt-3 pt-8 ">
                <label htmlFor="email" className="text-sm text-muted-foreground ">
                  Work Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email address..." className="mt-1  py-5" onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                <label htmlFor="password" className="text-sm text-muted-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password..."
                  className="mt-1 py-5"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <Button className="w-full py-6 text-sm text-primary-foreground bg-blue-500 hover:bg-blue-600 mt-1" onClick={submitHandler}>Continue</Button>

              <p className="text-sm text-center text-muted-foreground  w-[75%] mt-2 mx-auto">
                New to Thread? 
                <Link to="/signup" className=" text-[#007AFF] ml-2 font-semibold no-underline">
                  Sign Up Now
                </Link>{" "}

              </p>
            </div>
          </div>
        </main>
      </div>
      

    </div>
  );
}

export default SignIn;
