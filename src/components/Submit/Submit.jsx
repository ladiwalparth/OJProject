import { useState } from 'react'
import Editor from '@monaco-editor/react';
import { getOutput } from '../../service/api';
import { useNavigate } from 'react-router-dom';
const Submit = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('// Output');
    const navigate = useNavigate();
    const handleOnClick = async () => {
        const data = {
            language: 'cpp',
            code
        }
        const temp = await getOutput(data, navigate);
        setOutput(temp.output);
    }
    return (
        <div className="w-full h-screen py-2">
            <div className="w-full h-full flex gap-3">

                <div className="border-2 border-[#323754] w-full h-full">
                    <Editor
                        height="100%"
                        width="100%"
                        theme="vs"
                        defaultLanguage="cpp"
                        defaultValue="// Write your code here"
                        value={code}
                        onChange={(data) => setCode(data)}
                        options={
                            {
                                fontSize: 20
                            }
                        }
                    />
                    {/* monaco code editor directly give the changed value as the previous element we do not have to 
                     do something like e.target.value in onChange event listener   */}
                </div>
                <div className="flex flex-col w-[55%] h-full gap-3">
                    <div className="border-2 border-[#323754] w-full h-full bg-gray-300 px-4">
                        {/* <p style={{
                            // fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 20,
                            color: '#323754'
                        }}>{output}</p> */}
                        <Editor
                            height="100%"
                            width="100%"
                            theme="vs"
                            defaultLanguage="plaintext"
                            defaultValue="// Output"
                            value={output}
                            onChange={(data) => setOutput(data)}
                            options={
                                {
                                    fontSize: 20
                                }
                            }
                        />

                    </div>
                    <div className="border-2 border-[#323754] w-full h-[50%] p-5 flex justify-center">
                        <button className="w-full h-[40%] border border-black text-white bg-[#323754]" style={{ fontSize: 20 }} onClick={handleOnClick}>Output</button>
                    </div>
                </div>
            </div>
            {/* this additional div because m-5 was not working with h and w full, so have to use padding */}
        </div>
    )
}


export default Submit

