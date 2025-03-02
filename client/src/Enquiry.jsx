import React, { useEffect, useState } from "react";
import { EnquiryList } from "./enquiry/EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export default function Enquiry() {
  let [enquiryList,setEnquiryList] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id:""
  });

  

  // Handle input changes properly
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
// view api
  let getAllenquiry = () => {
    axios.get(`http://localhost:8020/api/website/enquiry/view`)
    .then((res) => {
      return res.data
    }).then((finalData) => {
      if (finalData.status) {
        setEnquiryList(finalData.enquiryList)
      }
       
    })
  }

  // Handle form submission properly
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData._id){
      //update
      axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData).then((res) => {
        toast.success("Enquiry Updated successfully")
        setFormData({
          name:"",
          email:"",
          phone:"",
          message:"",
          _id:""
        })
        getAllenquiry()
        
      })
    }else{
       // Insert
      try {
        const response = await axios.post(
          "http://localhost:8020/api/website/enquiry/insert",
          formData
        );
       toast.success("Enquiry submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        getAllenquiry();
      } catch (error) {
        console.error("Error submitting enquiry:", error);
        toast.error("Failed to submit enquiry")
        
      }
    }
    
    
  };

useEffect(() => {
  getAllenquiry();
},[])

  return (
    <div>
      <ToastContainer/>
    <div className="grid grid-cols-[30%_auto]">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-center mb-4">Enquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {formData._id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <EnquiryList data = {enquiryList} getAllenquiry={getAllenquiry} setFormData={setFormData}/>
    </div>
    </div>
  );
}
