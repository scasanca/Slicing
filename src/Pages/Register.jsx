import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', passwordConfirmation)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://frontendreq.pondokprogrammer.com/api/register',
      headers: {
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[300px] h-[460px] rounded-sm absolute bg-slate-100 shadow-2xl flex justify-center ">
        <div className="flex flex-col items-center gap-3 mt-5">
          <h1 className=" top-52 flex justify-center items-center left-96 text-[40px] font-bold leading-10 text-[#6889FF] placeholder:">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-5 flex justify-center items-center font-normal p-5 text-black placeholder:text-[#515151]"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Masukkan Email"
              className="w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-5 flex justify-center items-center font-normal p-5 text-black placeholder:text-[#515151]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Masukkan Password"
              className="w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-5 flex justify-center items-center font-normal p-5 text-black placeholder:text-[#515151]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Konfirmasi Password"
              className="w-[280px] h-[35px] rounded-md bg-[#F6F6F6] mt-5 flex justify-center items-center font-normal p-5 text-black placeholder:text-[#515151]"
              onChange={(e) => setpasswordConfirmation(e.target.value)}
              required
            />

            <button
              className="w-[280px] h-[40px] rounded-md bg-[#6889FF] text-[#F6F6F6] font-semibold "
              type="submit"
            >
              Button
            </button>
          </form>
          <p className="w-[200] h-[15px] top-[500px] left-[450px] text-xs">
            Sudah memiliki akun,
            <a href="http://localhost:5173/" className="text-[#6889FF]">
              {" "}
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
