"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditTask(){

  const { id } = useParams()
  const router = useRouter()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [status,setStatus] = useState("TODO")

  useEffect(()=>{

    const token = localStorage.getItem("token")

    fetch(`http://localhost:8080/tasks/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setTitle(data.title)
      setDescription(data.description)
      setStatus(data.status)
    })

  },[id])


  const handleUpdate = async () => {

    const token = localStorage.getItem("token")

    await fetch(`http://localhost:8080/tasks/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        title,
        description,
        status
      })
    })

    alert("Task Updated Successfully")

    router.push("/admin/tasks")

  }


  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6">

      <div className="bg-slate-900/70 backdrop-blur-lg border border-slate-700 p-10 rounded-2xl shadow-xl w-[440px]">

        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Edit Task
        </h1>


        {/* Title */}

        <label className="text-sm text-gray-400 mb-1 block">
          Task Title
        </label>

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full p-3 mb-5 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter task title"
        />


        {/* Description */}

        <label className="text-sm text-gray-400 mb-1 block">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          rows={4}
          className="w-full p-3 mb-5 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter task description"
        />


        {/* Status */}

        <label className="text-sm text-gray-400 mb-1 block">
          Status
        </label>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full p-3 mb-6 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >

          <option value="TODO">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Completed</option>

        </select>


        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition"
          >
            Update Task
          </button>

          <button
            onClick={()=>router.push("/admin/tasks")}
            className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  )
}