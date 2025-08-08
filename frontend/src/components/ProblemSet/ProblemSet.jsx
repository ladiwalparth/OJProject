import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getProblems } from '../../service/api'
const ProblemSet = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const fetchproblems = async () => {
      const data = await getProblems(navigate);
      setProblems(data);
    }
    fetchproblems();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      
      {problems.map(item => {
        return <Link to={`/displayProblem/${item.code}`} key={item._id} className="text-2xl text-[#323754] font-semibold h-10 border-2 border-[#323754] px-3 flex justify-between items-center">
          <div className="mx-5">{item.name}</div>
          <div>{item.difficulty}</div>
        </Link>
      })}
      {/* note if you are using curly brackets in map then you must use return, implicit 
      return would not work then */}
    </div>
  )

}

export default ProblemSet
