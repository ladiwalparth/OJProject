import { Link, useNavigate } from "react-router-dom"

import { enterData } from "../../service/api";
const Enter = () => {
  
  const navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = e.target.userId.value;
    const password = e.target.password.value;

    const formData = {
      userId,
      password
    }

    try {

      await enterData(formData,navigate);
      

    } catch (error) {

      console.log(error.message);
    }
  }
  return (
    <div className="mt-[12px] h-[500px] w-full flex flex-col justify-center items-center">
      <div className="text-3xl text-[#323754] mb-3 border border-black rounded-md py-3 px-10 font-bold"> Enter </div>
      <form onSubmit={handleSubmit} className="rounded-xl h-[300px] w-[40%] shadow-lg/50 flex flex-col p-8 gap-3">
        <input name="userId" placeholder="USER ID" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required />
        <input name="password" placeholder="PASSWORD" className="h-full w-full border border-black rounded-md text-3xl p-2.5" required />
        <button className="h-full w-full border border-black rounded-md text-3xl p-2.5 text-white bg-[#323754]">Submit</button>
      </form>
      <Link to='/register' className='text-xl mt-2 text-[#3427df]'>
        Don't have an account? Register
      </Link>
    </div>
  )
}

export default Enter
