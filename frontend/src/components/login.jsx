import React, { useState } from "react";
import axios from 'axios';
const LoginPage = () => {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [toggle, settoggle] = useState(false);

  const handleToggle=()=>{ 
    settoggle(!toggle);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('http://localhost:3000/login',{name,password});
      console.log(res.data);
      setname('');
      setpassword('');
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className="h-screen flex flex-row justify-center items-center text-black">
        {/* Login Box */}
        <div className="flex flex-col gap-7 border-b-8 w-[90vw] md:w-[30vw] min-h-[70vh] backdrop-blur-3xl p-10 m-auto border rounded-3xl shadow-lg shadow-stone-700">
          <div className="mb-10 text-center text-4xl font-bold border-b-black border-b-8 rounded-xl">
            <h1>Welcome Back</h1>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Online ID"
              className="w-full p-3 rounded-lg border border-gray-300 text-black"
              value={name} onChange={(e)=>setname(e.target.value)}
            />
            <input
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 text-black"
              type={toggle ? "text" : "password"}
              value={password} onChange={(e)=>setpassword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="show" className="h-4 w-4" onClick={handleToggle} value={toggle}/>
              <label htmlFor="show" className="text-sm">
                Show Password
              </label>
            </div>
            <input type="submit" value="Login" className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold cursor-pointer active:scale-90 transition-all ease-in-out"/>
          </form>
          <div className="flex justify-center space-x-4 mt-4 text-gray-900">
            <a href="#">Forgot Online Id</a>
            <p>•</p>
            <a href="#">Forgot Password</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
