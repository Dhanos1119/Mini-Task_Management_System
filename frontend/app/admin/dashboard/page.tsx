"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {

  const router = useRouter()
  
  const [tasks,setTasks] = useState<any[]>([])
  const [loading,setLoading] = useState(true)
  const [authorized,setAuthorized] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if(!token || role !== "ADMIN"){
      router.push("/login")
      return
    }

    setAuthorized(true)
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
        console.error("API error:",res.status)
        setTasks([])
        return
      }

      const data = await res.json()

      setTasks(Array.isArray(data) ? data : [])

    }catch(error){

      console.error("Fetch error:",error)
      setTasks([])

    }finally{

      setLoading(false)

    }

  }

  const logout = () => {
    localStorage.clear()
    router.push("/login")
  }

  if(!authorized){
    return null
  }

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task)=>task.status === "DONE"
  ).length

  const pendingTasks = tasks.filter(
    (task)=>task.status === "TODO" || task.status === "IN_PROGRESS"
  ).length

  const chartData = {
    labels:["Completed","Pending"],
    datasets:[
      {
        data:[completedTasks,pendingTasks],
        backgroundColor:[
          "#22c55e",
          "#facc15"
        ],
        borderWidth:3,
        borderColor:"#0f172a"
      }
    ]
  }

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <div className="flex-1 p-12">

        <h1 className="text-4xl font-bold mb-12 text-center tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {loading && (
          <p className="text-center text-gray-400">
            Loading tasks...
          </p>
        )}

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.03] transition duration-300">

            <h2 className="text-gray-400 text-lg">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold mt-4 tracking-wide">
              {totalTasks}
            </p>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-green-500/20 hover:scale-[1.03] transition duration-300">

            <h2 className="text-gray-400 text-lg">
              Completed Tasks
            </h2>

            <p className="text-5xl font-bold mt-4 text-green-400">
              {completedTasks}
            </p>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.03] transition duration-300">

            <h2 className="text-gray-400 text-lg">
              Pending Tasks
            </h2>

            <p className="text-5xl font-bold mt-4 text-yellow-400">
              {pendingTasks}
            </p>

          </div>

        </div>

        {/* Chart */}

        <div className="max-w-lg mx-auto bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-10 shadow-xl">

          <h2 className="text-center text-gray-300 mb-6 text-lg">
            Task Distribution
          </h2>

          <Pie data={chartData} />

        </div>
        {/* Task List */}

<div className="max-w-6xl mx-auto mt-16">

<h2 className="text-2xl font-semibold mb-6 text-center">
All Tasks
</h2>

<div className="grid gap-6">

{tasks.map((task)=>(
  
<div
key={task.id}
className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow"
>

<h3 className="text-xl font-bold">
{task.title}
</h3>

<p className="text-gray-400 mt-2">
{task.description}
</p>

<p className="text-sm text-gray-400 mt-3">
Created By :
<span className="ml-2 text-blue-400 font-semibold">
{task.createdBy}
</span>
</p>

<p className="text-sm mt-2">
Priority :
<span className="ml-2 text-yellow-400 font-semibold">
{task.priority}
</span>
</p>

<p className="text-sm mt-2">
Status :
<span className="ml-2 bg-black px-2 py-1 rounded">
{task.status}
</span>
</p>

</div>

))}

</div>

</div>

      </div>

    </div>

  )

}