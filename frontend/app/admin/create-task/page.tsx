"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CreateTask(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [status,setStatus] = useState("TODO")
  const [priority,setPriority] = useState("MEDIUM")
  const [dueDate,setDueDate] = useState("")
  const [userId,setUserId] = useState("")
  const [users,setUsers] = useState<any[]>([])

  useEffect(()=>{

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if(!token || role !== "ADMIN"){
      router.push("/login")
      return
    }

    fetchUsers()

  },[])


  const fetchUsers = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:8080/users",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(!res.ok){
        console.error("Users API error",res.status)
        return
      }

      const data = await res.json()
      setUsers(data)

    }catch(err){
      console.error(err)
    }

  }


const handleSubmit = async () => {

  if(!userId){
    alert("Please select a user")
    return
  }

  try{

    const token = localStorage.getItem("token")

    console.log("UserId sending:", userId)   // 👈 ADD HERE

    const res = await fetch("http://localhost:8080/tasks/assign",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        title,
        description,
        status,
        priority,
        dueDate,
        userId: parseInt(userId)
      })
    })

    if(!res.ok){
      alert("Task assign failed")
      return
    }

    alert("Task Assigned Successfully")

  }catch(err){
    console.error(err)
  }

}

  return(

    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-[420px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Assign Task
        </h1>

        <div className="flex flex-col gap-4">

          {/* Title */}

          <input
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            placeholder="Task Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          {/* Description */}

          <textarea
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            placeholder="Task Description"
            rows={4}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />


          {/* Status */}

          <select
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>


          {/* Priority */}

          <select
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            value={priority}
            onChange={(e)=>setPriority(e.target.value)}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>


          {/* Due Date */}

<input
  type="date"
  className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-white [color-scheme:dark]"
  value={dueDate}
  onChange={(e)=>setDueDate(e.target.value)}
/>


          {/* User Select */}

          <select
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
          >

            <option value="">Select User</option>

            {users.map((user)=>(

              <option key={user.id} value={user.id}>
                {user.email}
              </option>

            ))}

          </select>


          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
          >
            Assign Task
          </button>

        </div>

      </div>

    </div>

  )
}