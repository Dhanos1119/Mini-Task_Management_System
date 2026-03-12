"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const signup = async () => {

    try {

      // Register user
      const registerResponse = await fetch("http://localhost:8080/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      });

      if(!registerResponse.ok){
        alert("Signup failed");
        return;
      }

      // Auto login
      const loginResponse = await fetch("http://localhost:8080/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = await loginResponse.json();

      localStorage.setItem("userId", data.id);
      localStorage.setItem("role", data.role);

      router.push("/user/dashboard");

    } catch(error){
      console.error(error);
      alert("Server error");
    }

  }

return (

    <div className="min-h-screen bg-gray-950 flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-[380px] text-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <div className="flex flex-col gap-4">

          <input
             type="text"
             placeholder="Name"
             className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
             value={name}
             onChange={(e)=>setName(e.target.value)}
          />

       <input
         type="text"
         placeholder="Email"
         className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />

       <input
         type="password"
         placeholder="Password"
         className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        />

          <button
            onClick={signup}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>

       <p className="text-gray-400 text-sm text-center mt-2">
          Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-blue-400 font-medium cursor-pointer hover:underline hover:text-blue-300 transition"
        >
          Login
       </span>
      </p>

        </div>

      </div>

    </div>

  )
}