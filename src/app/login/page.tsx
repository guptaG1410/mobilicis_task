"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import  axios from "axios";
import {toast} from 'react-hot-toast'

export default function loginPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
      });

    const [buttonDisabled, setButtonDisabled] = useState(false);
      const [loading, setLoading] = useState(false);

    const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login Success", response.data);
        toast.success("Login success");
        router.push('/profile')
      } catch (err : any) {
        console.log("Login failed", err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Spinner" : "Login Page"}</h1>
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onLogin}>Login</button>
      <Link href="/signup">Don't have an account?</Link>
    </div>
  );
}
