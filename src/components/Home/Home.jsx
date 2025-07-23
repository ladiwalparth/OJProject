import React,{useState} from 'react'

const Home = () => {
  const [state,setState] = useState(1);
  return (
    <div onClick={()=>setState(state+1)}>
      Home
      {state}
    </div>
  )
}

export default Home
