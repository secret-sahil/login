import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
export default function Loginpage(){
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [spinner, setspinner] = useState('hidden')
    const [message, setMessage] = useState("");
    const [opac, setopac] = useState('')
    let navigate=useNavigate('')

    const handlesubmit=async (e)=>{
e.preventDefault();

const data={email,password}
console.log(data);
if(email=='' || password==''){
    setMessage('*Every input must be filled')
}
else{
    setspinner('')
    setopac('opacity-50')

} 
    }
    return(<>
    <div className="h-screen bgimg flex justify-center items-center  ">
        <div className="box flex h-[450px] border w-[700px] items-center justify-between bg-white shadow-lg shadow-blue-400  rounded-lg px-5 xsm:justify-center xsm:mx-2">
            <div className="h-full  flex items-center w-80 justify-center  xsm:hidden">
                <img src="/leftsideimage.png" className="h-fit xsm:hidden"/>
            </div>
            <div className="h-full w-[320px]  border-l-2 border-blue-100  xsm:border-0 ">
                <div className="text-center font-bold text-2xl  pt-3 animate-pulse txt ">
                    Login
                </div>
                <div className="flex justify-evenly mt-3">
                    <label  className="px-2 py-1 shadow-lg cursor-pointer bg-blue-50">
                        <div className="h-24 w-24 flex justify-center items-center ">
                            <img name='type' src="/recruiter.png"/>
                        </div>
                       <label htmlFor="type" className="flex space-x-1 justify-center items-center">
                        <input type="radio" name="type" className=""/>
                        <label htmlFor="type" className='font-semibold text-sm txt'>RECRUITER</label>
                       </label>
                    </label>
                    <label className="px-2 py-1 shadow-lg  cursor-pointer bg-blue-50">
                        <div className="h-24 w-24 flex justify-center items-center">
                            <img src="/worker.png"/>
                        </div>
                       <label htmlFor="type" className="flex space-x-1 justify-center items-center">
                        <input type="radio" name="type"  className=""/>
                        <label htmlFor='type' className='font-semibold text-sm txt'>WORKER</label>
                       </label>
                    </label>
    
        </div>
        <div className="my-4 px-4 " > 
            <div className="flex flex-col space-y-4">
                <label htmlFor="email" className='flex items-center'>
                    <div className='absolute left-13 h-6 text-md   flex items-center px-2 border-r-[2px] border-r-gray-400 text-blue-500'> <FaUser /> </div>                    
                    <input  required={true} value={email}  onChange={(e) => { setemail(e.target.value); }} id="email" name="email" type="email" className="text-blue-500 w-full pl-11 py-2 bg-blue-100 border  rounded-lg  focus:outline-none focus:border-slate-500 hover:shadow" placeholder="username"/>
                </label>
                <label htmlFor="password" className='flex items-center'>
                    <div className='absolute left-13 h-6 text-lg  flex items-center px-[7px] border-r-[2px] border-r-gray-400 text-blue-500'> <IoIosLock /> </div>                    
                    <input required={true} value={password}  onChange={(e) => { setpassword(e.target.value); }} id="password" name="password" type='password' className="w-full text-blue-500 bg-blue-100 pl-11  py-2 border border-slate-200 rounded-lg  focus:outline-none focus:border-slate-500 hover:shadow" placeholder="password"/>
                </label>
                <div className="flex flex-row items-center justify-end text-sm  ">
                    {/* <div>
                        <label htmlFor="remember" className=" flex items-center">
                            <input type="checkbox" id="remember" className=" bg-blue-100 w-4 h-4 mr-1 border-slate-200 " />
                            Remember me
                        </label>
                    </div> */}
                
                    <div className='flex'>
                        <div>Not registered yet? </div>
                        <Link to='/registeration' className="ml-1 text-blue-700 font-semibold">Register now</Link>
                    </div>
                </div>

              <button onClick={handlesubmit} className="w-full py-3 mt-2  bg-blue-700 text-white rounded-lg text-md hover:shadow inline-flex  items-center justify-center ">
                 LOGIN      
                </button>
                <div className={`text-center text-red-500 `}>{message}</div>

            </div>
                   
                </div>
            </div>
        </div>
    </div>
    </>)
}