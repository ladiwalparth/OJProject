import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getParticularProblem, getParticularTestCase } from '../../service/api.js';
const DisplayProblem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [problemName, setProblemName] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [sampleTestCase, setSampleTestCase] = useState(null);
  const submitlogic = () => {
    navigate(`/submit/${id}`);
  };
  useEffect(() => {
    const wrapper = async () => {
      const problemDetails = await getParticularProblem(id, navigate);
      const testCase = await getParticularTestCase(id);
      console.log(testCase);
      if (problemDetails) {
        setProblemName(problemDetails.name);
        setProblemStatement(problemDetails.statement);
      }
      if (testCase) {
        setSampleTestCase(testCase);
      }
    }
    wrapper();
  }, []);
  return (
      <>
      <div className='w-full border-2 border-[#323754] rounded-md flex flex-col items-center p-10'>
        <div className='text-2xl text-[#323754] font-semibold mb-9'>{problemName}</div>
        <div className='text-2xl text-[#323754]'>{problemStatement}</div>
      </div>
      <div className='w-full border-2 border-[#323754] rounded-md flex flex-col items-start px-2 pt-2 pb-4 mt-4'>
        <div className='text-2xl text-[#323754] font-semibold'>TestCases</div>
        <div className='text-2xl text-[#323754] font-semibold mt-2 px-3'>Input</div>
        <div className='w-full border-2 border-[#323754] rounded-md'>
          {sampleTestCase && sampleTestCase.input.map((item, index) => {
            return <div className='text-xl text-[#323754] font-normal px-5'>{index + 1} - {item}</div>;
          })}
        </div>

        <div className='text-2xl text-[#323754] font-semibold mt-2 px-3'>Expected Output</div>

        <div className='w-full border-2 border-[#323754] rounded-md'>
          {sampleTestCase && sampleTestCase.output.map((item, index) => {
            return <div className='text-xl text-[#323754] font-normal px-5'>{index + 1} - {item}</div>;
          })}
        </div>

        <div className="w-full flex justify-center mt-4">
          <button className='h-[55px] w-[250px] text-2xl text-white bg-[#323754] font-semibold mx-auto rounded-lg cursor-pointer' onClick={submitlogic}>Code and Submit</button>
        </div>
      </div>
      </>
      )
}

      export default DisplayProblem
