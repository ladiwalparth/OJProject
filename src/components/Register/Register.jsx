import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import uploadData from '../../service/api.js'

const Register = () => {

    const navigate = useNavigate();
    
    const [formData,setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        dob: "",
        userId: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();


        // const formData = new FormData(form);

        console.log(formData);

        
        try {
            
            await uploadData(formData,navigate);

        } catch (error) {

            console.log(error.message);
        }
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <div className="text-3xl text-[#323754] mb-3 border border-black rounded-md py-3 px-6 font-bold"> Register </div>

            <form onSubmit={handleSubmit} className="rounded-xl h-[500px] w-[40%] shadow-lg/50 flex flex-col p-8 gap-3">
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="FULL NAME" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required/>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="EMAIL" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required/>
                <input name="password" value={formData.password} onChange={handleChange} placeholder="PASSWORD" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required/>
                <input name="dob" value={formData.dob} onChange={handleChange} placeholder="DATE OF BIRTH (YYYY-MM-DD)" className="h-full w-full border border-black rounded-md text-3xl p-2.5" pattern="\d{4}-\d{2}-\d{2}" required />
                <input name="userId" value={formData.userId} onChange={handleChange} placeholder="USER ID" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required/>
                <button className="h-full w-full border border-black rounded-md text-3xl p-2.5 text-white bg-[#323754]">Submit</button>
            </form>

            <Link to='/enter' className='text-xl mt-2 text-[#3427df]'>
                Already a user? Enter
            </Link>
        </div>
    )
}

export default Register
