import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getSubmissions } from '../../service/api'
const Submissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetchSubmissions = async () => {
      const data = await getSubmissions(navigate);
      setSubmissions(data);
    }
    fetchSubmissions();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      
      {submissions.map(item => {
        return <div key={item._id} className="text-2xl text-[#323754] font-semibold h-10 border-2 border-[#323754] px-3 flex justify-between items-center">
          <div className="mx-5">ProblemName:  {item.problem}</div>
          <div>Verdict:  {item.verdict}</div>
        </div>
      })}
      {/* note if you are using curly brackets in map then you must use return, implicit 
      return would not work then */}
    </div>
  )

}

export default Submissions