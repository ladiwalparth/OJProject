import { useState } from 'react'
import Editor from '@monaco-editor/react';
import { getOutput,getVerdict } from '../../service/api';
import { useNavigate,useParams } from 'react-router-dom';
const Submit = () => {
    const [code, setCode] = useState('');
    const [input,setInput] = useState('');
    const [output, setOutput] = useState('// Output');
    const navigate = useNavigate();
    const { id } = useParams();
    const handleOnClick = async () => {
        const data = {
            language: 'cpp',
            code,
            input
        }
        const temp = await getOutput(data, navigate);
        setOutput(temp.output);
    }
    const handleSubmit = async () => {
        console.log("ran code");
        const data = {
            code,
            id
        }
        await getVerdict(data,navigate);
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
                    <div className="border-2 border-[#323754] w-full h-[40%] bg-gray-300 px-4">
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
                            defaultValue="// Enter Custom Input"
                            value={input}
                            onChange={(data) => setInput(data)}
                            options={
                                {
                                    fontSize: 20,
                                }
                            }
                        />

                    </div>
                    <div className="border-2 border-[#323754] w-full h-[40%] bg-gray-300 px-4">
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
                                    fontSize: 20,
                                }
                            }
                        />

                    </div>
                    <div className="border-2 border-[#323754] w-full h-[50%] p-5 flex flex-col gap-3 justify-center">
                        <button className="w-full h-[40%] border border-black text-white bg-[#323754] rounded-lg cursor-pointer" style={{ fontSize: 27 }} onClick={handleOnClick}>Run</button>
                        <button className="w-full h-[40%] border border-black text-white bg-[#323754] rounded-lg cursor-pointer" style={{ fontSize: 27 }} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            {/* this additional div because m-5 was not working with h and w full, so have to use padding */}
        </div>
    )
}


export default Submit

