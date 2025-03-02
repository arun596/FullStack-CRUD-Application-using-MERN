import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

export function EnquiryList({data,getAllenquiry,setFormData}){
  let deleteRow = (delid) => {
        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`).then((res) => {
          toast.success("Enquiry delted successfully")
          getAllenquiry()
        })
  }

  let editRow = (editid)=>{
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
    .then((res) => {
      let data = res.data
      setFormData(data.enquiry)
      
    })
  }
    return(
      <div className="overflow-x-auto p-10">
        <ToastContainer/>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sr No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Meassage</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
                <th className="border border-gray-300 px-4 py-2">Edit</th>
              </tr>
            </thead>

            <tbody className="divide-y">

          {
            data.length>=1 ?
            data.map((item,index) => {
              return(
                <>
                <tr className='bg-white' key={index}>
              <td className="border border-gray-300 px-4 py-2">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{item.message}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => deleteRow(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md hover:cursor-pointer'>Delete</button>
              </td>
              <td className="border border-gray-300 px-4 py-2 hover:cursor-pointer">
                <button onClick={()=>editRow(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Edit</button>
              </td>
            </tr>
                </>
              )
            })
            :
            <tr className='bg-white'>
              <td className="border border-gray-300 px-4 py-2">No data found</td>
            </tr>
            
          }
              
            </tbody>
          </table>
        </div>
    )
  }
  