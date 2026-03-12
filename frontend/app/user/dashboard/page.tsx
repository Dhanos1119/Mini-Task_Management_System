"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {

const router = useRouter();

const [tasks, setTasks] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

const [statusFilter, setStatusFilter] = useState("ALL");
const [priorityFilter, setPriorityFilter] = useState("ALL");
const [search, setSearch] = useState("");
const [sort, setSort] = useState("DEFAULT");

const [page, setPage] = useState(1);
const tasksPerPage = 5;

const [showCreate,setShowCreate] = useState(false)
const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [priority,setPriority] = useState("MEDIUM")
const [dueDate,setDueDate] = useState("")

/* ========================= */
/* AUTH CHECK + AUTO REFRESH */
/* ========================= */

useEffect(()=>{

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if(!token || role !== "USER"){
router.push("/login");
return;
}

fetchTasks()

// 🔥 auto refresh every 5 seconds
const interval = setInterval(fetchTasks,5000)

return ()=> clearInterval(interval)

},[])

/* ========================= */
/* FETCH TASKS */
/* ========================= */

const fetchTasks = async()=>{

try{

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

if(!userId || !token){
return;
}

const res = await fetch(`http://localhost:8080/tasks/user/${userId}`,{
headers:{
Authorization:`Bearer ${token}`
}
})

const data = await res.json()

console.log("Fetched tasks:", data)

if(Array.isArray(data)){
setTasks(data)
}else{
setTasks([])
}

}catch(error){
console.error(error)
setTasks([])
}
finally{
setLoading(false)
}

}

/* ========================= */
/* CREATE TASK */
/* ========================= */

const createTask = async()=>{

try{

const token = localStorage.getItem("token")

await fetch("http://localhost:8080/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({
title,
description,
priority,
dueDate,
status:"TODO"
})

})

setShowCreate(false)
setTitle("")
setDescription("")
setPriority("MEDIUM")
setDueDate("")

fetchTasks()

}catch(error){
console.error(error)
}

}

/* ========================= */
/* COMPLETE TASK */
/* ========================= */

const completeTask = async(id:number)=>{

try{

const token = localStorage.getItem("token")

await fetch(`http://localhost:8080/tasks/${id}/complete`,{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
})

fetchTasks()

}catch(error){
console.error(error)
}

}

/* ========================= */
/* DELETE TASK */
/* ========================= */

const deleteTask = async(id:number)=>{

try{

const token = localStorage.getItem("token")

await fetch(`http://localhost:8080/tasks/${id}`,{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
})

fetchTasks()

}catch(error){
console.error(error)
}

}

const logout = ()=>{
localStorage.clear()
router.push("/login")
}

/* ========================= */
/* FILTERS */
/* ========================= */

let filteredTasks = tasks

if(search){
filteredTasks = filteredTasks.filter(task =>
task.title?.toLowerCase().includes(search.toLowerCase())
)
}

if(statusFilter !== "ALL"){
filteredTasks = filteredTasks.filter(task => task.status === statusFilter)
}

if(priorityFilter !== "ALL"){
filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter)
}

if(sort === "DUE_DATE"){

filteredTasks = [...filteredTasks].sort((a,b)=>{

const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity

return dateA - dateB

})

}

if(sort === "PRIORITY"){

const priorityOrder:any = {
HIGH:1,
MEDIUM:2,
LOW:3
}

filteredTasks = [...filteredTasks].sort((a,b)=>{

return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)

})

}

/* ========================= */
/* PAGINATION */
/* ========================= */

const indexOfLast = page * tasksPerPage
const indexOfFirst = indexOfLast - tasksPerPage

const currentTasks = filteredTasks.slice(indexOfFirst,indexOfLast)
const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

return(

<div className="min-h-screen bg-slate-900 text-white">

{/* NAVBAR */}

<div className="flex justify-between items-center px-10 py-5 bg-slate-800 border-b border-slate-700">

<h1 className="text-3xl font-bold">
User Dashboard
</h1>

<div className="flex gap-4">

<button
onClick={fetchTasks}
className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-semibold"
>
Refresh
</button>

<button
onClick={()=>setShowCreate(true)}
className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold"
>
+ Create Task
</button>

<button
onClick={logout}
className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold"
>
Logout
</button>

</div>

</div>

<div className="max-w-6xl mx-auto p-10">

<h2 className="text-2xl font-semibold mb-8">
My Tasks
</h2>

{/* TASK LIST */}

<div className="grid gap-6">

{currentTasks.map(task=>(

<div
key={task.id}
className="bg-slate-800 border border-slate-700 text-white rounded-xl p-6"
>

<h3 className="text-xl font-bold">
{task.title}
</h3>

<p className="text-gray-300 mt-2">
{task.description}
</p>

<p className="text-sm mt-3">
Priority : <span className="text-yellow-400">{task.priority}</span>
</p>

<p className="text-sm">
Due Date : {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
</p>

<p className="text-xs text-gray-400 mt-2">
Assigned by : {task.createdBy}
</p>

<div className="mt-4">

<span className="px-3 py-1 bg-black rounded text-sm">
{task.status}
</span>

</div>

<div className="flex gap-3 mt-6">

{task.status !== "DONE" && (

<button
onClick={()=>completeTask(task.id)}
className="bg-green-500 px-4 py-2 rounded"
>
Complete
</button>

)}

<button
onClick={()=>deleteTask(task.id)}
className="bg-red-500 px-4 py-2 rounded"
>
Delete
</button>

</div>

</div>

))}

</div>

{/* PAGINATION */}

<div className="flex gap-2 mt-10">

{[...Array(totalPages)].map((_,index)=>(

<button
key={index}
onClick={()=>setPage(index+1)}
className={`px-4 py-2 rounded ${
page === index+1 ? "bg-blue-500" : "bg-slate-700"
}`}
>

{index+1}

</button>

))}

</div>

</div>

</div>

)

}