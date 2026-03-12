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

    alert("Task Updated")

    router.push("/user/dashboard")

  }


  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl w-[420px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Task
        </h1>

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        >

          <option value="TODO">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Completed</option>

        </select>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
        >
          Update Task
        </button>

      </div>

    </div>

  )
}