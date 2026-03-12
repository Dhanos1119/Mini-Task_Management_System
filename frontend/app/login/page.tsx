"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // already logged user redirect
  useEffect(() => {

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token) return

    if (role === "ADMIN") {
      router.push("/admin/dashboard")
    }

    if (role === "USER") {
      router.push("/user/dashboard")
    }

  }, [])

  const handleLogin = async () => {

    try {

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (!response.ok) {
        alert("Invalid email or password")
        return
      }

      const data = await response.json()

      // save token + user data
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.id)
      localStorage.setItem("role", data.role)

      console.log("JWT Token:", data.token)

      // role based redirect
      if (data.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/user/dashboard")
      }

    } catch (error) {

      console.error(error)
      alert("Server error")

    }

  }

  return (

    <div className="min-h-screen bg-gray-950 flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-[380px] text-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Email"
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-gray-400 text-sm text-center mt-2">
            Don't have an account?{" "}
            <span
              
              onClick={() => router.push("/signup")}
              className="text-blue-400 cursor-pointer hover:underline hover:text-blue-300"
            >
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>

  )
}