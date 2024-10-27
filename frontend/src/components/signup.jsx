import React, { useState } from "react";
import axios from "axios";
const SignupPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [toggle, settoggle] = useState(false);
  const [loading, setloading] = useState(false);

  const handleToggle = () => {
    settoggle(!toggle);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.endsWith("@gmail.com") || email.endsWith("@vitstudent.ac.in") || password.length < 7)
      {
        alert("Enter valid email and password should be atleast 6 characters");
        return;
      } 
    try {
      setloading(true);
      const res = await axios.post(
        "https://reactformbackend.onrender.com/signup",
        { email, password }
      );
      console.log(res.data);
      setemail("");
      setpassword("");
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  return (
    <>
      <div className="h-screen flex flex-row justify-center items-center text-black">
        {/* signup Box */}
        <div className="flex flex-col gap-7 border-b-8 w-[90vw] md:w-[30vw] min-h-[70vh] backdrop-blur-3xl p-10 m-auto border rounded-3xl shadow-lg shadow-stone-700">
          <div className="mb-10 text-center text-4xl font-bold border-b-black border-b-8 rounded-xl">
            <h1>Welcome</h1>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* email  */}
            <input
              type="text"
              placeholder="Email ID"
              className={`w-full p-3 rounded-lg border border-gray-300 text-black shadow-lg ${email.endsWith("@gmail.com") || email.endsWith("@vitstudent.ac.in") ? "shadow-green-500" : "shadow-red-500"}`}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {/* password  */}
            <input
              placeholder="Password"
              className={`w-full p-3 rounded-lg border border-gray-300 text-black shadow-lg ${password.length > 5 ? "shadow-green-500" : "shadow-red-500"}`}
              type={toggle ? "text" : "password"}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              {/* show password  */}
              <input
                type="checkbox"
                id="show"
                className="h-4 w-4"
                onClick={handleToggle}
                value={toggle}
              />
              <label htmlFor="show" className="text-sm">
                Show Password
              </label>
            </div>
            {/* submit button  */}
            <input
              type="submit"
              value="Signup"
              className={`w-full bg-gray-800 text-white py-3 rounded-full font-semibold active:scale-90 transition-all ease-in-out ${
                loading || !email || !password
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={loading || !email || !password}
            />
          </form>
          <div className="flex justify-center space-x-4 mt-4 text-gray-900">
            <a href="#">Already have account?</a>
            <p>•</p>
            <a href="#">Login here</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
