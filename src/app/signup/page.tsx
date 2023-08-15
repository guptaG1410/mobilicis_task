'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';

export default function signupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  const onSignup = async () => {
    try {
      setLoading(true);
      const resp = await axios.post('/api/users/signup', user);
      console.log('Signup Success', resp.data);
      router.push('/login');
    } catch (err: any) {
      console.log('Signup failed :(', err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    )
      setButtonDisabled(false);
    else {
  setButtonDisabled(true); }
  }, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Spinner' : 'Signup Page'}</h1>
      <label htmlFor="userName">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        placeholder="username"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
      />
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
      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href="/login">Already have an account?</Link>
    </div>
  );
}

// "use client";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import {useRouter} from "next/navigation";
// import axios from "axios";
// import { toast } from "react-hot-toast";




// export default function SignupPage() {
//     const router = useRouter();
//     const [user, setUser] = React.useState({
//         email: "",
//         password: "",
//         userName: "",
//     })
//     const [buttonDisabled, setButtonDisabled] = React.useState(false);
//     const [loading, setLoading] = React.useState(false);

//     const onSignup = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/signup", user);
//             console.log("Signup success", response.data);
//             router.push("/login");

//         } catch (error:any) {
//             console.log("Signup failed", error.message);

//             toast.error(error.message);
//         }finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if(user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
//             setButtonDisabled(false);
//         } else {
//             setButtonDisabled(true);
//         }
//     }, [user]);


//     return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1>{loading ? "Processing" : "Signup"}</h1>
//         <hr />
//         <label htmlFor="userName">userName</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="userName"
//             type="text"
//             value={user.userName}
//             />
//         <label htmlFor="email">email</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="text"
//             value={user.email}
//             />
//         <label htmlFor="password">password</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="password"
//             type="password"
//             value={user.password}
//             />
//             <button
//             onClick={onSignup}
//             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
//             <Link href="/login">Visit login page</Link>
//         </div>
//     )
// }