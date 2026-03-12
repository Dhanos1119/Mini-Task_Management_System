"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const handleLogout = () => {

    // clear JWT data
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")

    // redirect to login
    window.location.href = "/login"

  }

  return (

    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* Sidebar */}

      <aside className="w-64 bg-gray-900 border-r border-gray-700 p-6">

        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link
            href="/admin/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/tasks"
            className="hover:text-blue-400 transition"
          >
            Tasks
          </Link>

          <Link
            href="/admin/create-task"
            className="hover:text-blue-400 transition"
          >
            Create Task
          </Link>

          <button
            onClick={handleLogout}
            className="text-left hover:text-red-400 transition"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>

  )

}