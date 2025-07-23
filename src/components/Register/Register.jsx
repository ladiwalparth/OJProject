import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = new FormData(form);

        
    }
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <div className="text-3xl text-[#323754] mb-3 border border-black rounded-md py-3 px-6 font-bold"> Register </div>

            <form method="post" onSubmit={handleSubmit} className="rounded-xl h-[500px] w-[40%] shadow-lg/50 flex flex-col p-8 gap-3">
                <input name="fullName" placeholder="FULL NAME" className="h-full w-full border border-black rounded-md text-3xl p-2.5" />
                <input name="email" placeholder="EMAIL" className="h-full w-full border border-black rounded-md text-3xl p-2.5" />
                <input name="password" placeholder="PASSWORD" className="h-full w-full border border-black rounded-md text-3xl p-2.5" />
                <input name="dob" placeholder="DATE OF BIRTH" className="h-full w-full border border-black rounded-md text-3xl p-2.5" />
                <input name="userId" placeholder="USER ID" className="h-full w-full border border-black rounded-md text-3xl p-2.5" />
                <button className="h-full w-full border border-black rounded-md text-3xl p-2.5 text-white bg-[#323754]">Submit</button>
            </form>

            <Link to='/enter' className='text-xl mt-2 text-[#3427df]'>
                Already a user? Enter
            </Link>
        </div>
    )
}

export default Register
