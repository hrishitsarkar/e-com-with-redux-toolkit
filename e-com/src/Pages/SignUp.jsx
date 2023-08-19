import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signUpUserAsync } from "../redux/reducers/auth/authReducer";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { error } = useSelector(authSelector);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            console.log("please add a password more than 6 character")
            return;
        }
        setLoading(!loading);
        setTimeout(() => {
            dispatch(signUpUserAsync({ email, password }))
            setEmail("");
            setPassword("");
            if (!error) {
                navigate('/sign-in');
            }
            setLoading(!loading);
        }, 2000)




    }
    return (<>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            <form className="flex flex-col items-center justify-between " onSubmit={handleSubmit}>
                <input type="text" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg bg-slate-200" placeholder="Enter Name" required />
                <input type="email" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg bg-slate-200" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg bg-slate-200" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />


                <button type="submit" className="bg-black m-2 p-2 text-white font-bold shadow-2xl rounded-lg hover:bg-facebook-blue">{loading ? <div className="flex items-center justify-between"><ClipLoader color="#36d7b7" /><span className="font-bold">Please wait</span></div> : "Sign Up"}</button>
            </form>

        </div>
    </>);
}

export default SignUp;