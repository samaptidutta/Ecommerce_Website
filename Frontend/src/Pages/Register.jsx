import React , {useState} from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name,setName] = useState("");
        const dispatch = useDispatch();
        

        const handleSubmit = (e)=>{
            e.preventDefault();
            dispatch(registerUser({name, email, password}))
            setEmail("")
            setPassword("")
            setName("")
        }

    return (
        <div className="mt-[145px] flex">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text uppercase ">
                DIGIMART
                </h2>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!👋🏼</h2>
            <p className="text-center mb-6">
                Enter your username and password to login
            </p>
            {/* name */}
            <div className="mb-4">
                <label htmlFor="fname" className="block text-sm font-semibold mb-2">
                    Name
                </label>
                <input
                type="text"
                value={name}
                id="fname"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="enter your first name"
                />
            </div>


            {/* email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
                </label>
                <input
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="enter your email address"
                />
            </div>

            {/* password */}
            <div className="mb-4">
                <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
                >
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
                Sign Up
            </button>

            <div className="flex items-center mt-6 gap-2">
                <p className=" text-center text-sm">Already have an have an account ?</p>
                <Link to="/login" className="text-blue-500">
                Login
                </Link>
            </div>
            </form>
        </div>

        <div className="hidden md:block w-1/2 bg-gray-800 mb-4 mr-4 ">
            <div className="h-full flex flex-col justify-center items-center ">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/876/198/small_2x/young-girl-sitting-using-laptop-with-expressions-and-gestures-on-background-photo.jpg"
                alt="login to account"
                className="h-[700px] w-full object-cover rounded-xl"
            />
            </div>
        </div>
        </div>
    );
    };

export default Register;
