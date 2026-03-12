"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Tasks(){

  const router = useRouter()

  const [tasks,setTasks] = useState<any[]>([])
  const [search,setSearch] = useState("")
  const [filter,setFilter] = useState("ALL")

  useEffect(()=>{

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if(!token || role !== "ADMIN"){
      router.push("/login")
      return
    }

    fetchTasks()

  },[])


  const fetchTasks = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:8080/tasks",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(!res.ok){
        console.error("Tasks API error")
        return
      }

      const data = await res.json()
      setTasks(data)

    }catch(err){
      console.error(err)
    }

  }


  const deleteTask = async (id:number) => {

    const token = localStorage.getItem("token")

    await fetch(`http://localhost:8080/tasks/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    setTasks(tasks.filter(task => task.id !== id))
  }


  const completeTask = async (task:any) => {

    const token = localStorage.getItem("token")

    await fetch(`http://localhost:8080/tasks/${task.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        title:task.title,
        description:task.description,
        status:"DONE"
      })
    })

    fetchTasks()
  }


  const filteredTasks = tasks.filter((task)=>{

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase())

    let matchesFilter = true

    if(filter === "DONE"){
      matchesFilter = task.status === "DONE"
    }

    else if(filter === "PENDING"){
      matchesFilter =
        task.status === "TODO" ||
        task.status === "IN_PROGRESS"
    }

    return matchesSearch && matchesFilter

  })


  return(

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-12">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Task Management
        </h1>


        {/* Search + Filter */}

        <div className="flex gap-4 mb-10">

          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none"
          >

            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Completed</option>

          </select>

        </div>


        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">
            No tasks found
          </p>
        )}


        {/* Task List */}

        <div className="space-y-6">

          {filteredTasks.map((task)=>(

            <div
              key={task.id}
              className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition"
            >

              <h3 className="text-xl font-semibold mb-1">
                {task.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {task.description}
              </p>

              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                task.status === "DONE"
                ? "bg-green-600"
                : "bg-yellow-500 text-black"
              }`}>
                {task.status}
              </span>

              <div className="flex gap-3 mt-5">

                {task.status !== "DONE" && (

                  <button
                    onClick={()=>completeTask(task)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition"
                  >
                    Complete
                  </button>

                )}

                <Link href={`/admin/edit-task/${task.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={()=>deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}