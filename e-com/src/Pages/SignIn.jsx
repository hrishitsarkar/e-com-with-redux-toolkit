import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signInUserAsync } from "../redux/reducers/auth/authReducer";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isLoggedIn} = useSelector(authSelector)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if(isLoggedIn){
            navigate("/");
        }
    },[isLoggedIn,navigate])
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            dispatch(signInUserAsync({email,password}))
            setEmail("");
            setPassword("");
            setLoading(false)
        },2000)
        
        
    }
    return (<>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                <path d="M7 6a1 1 0 0 1 2 0v1H7V6z" />
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z" />
            </svg>
            <form className="flex flex-col items-center justify-between " onSubmit={handleSubmit}>
                <input type="email" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg bg-slate-200" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg bg-slate-200" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="bg-black m-2 p-2 text-white font-bold shadow-2xl rounded-lg hover:bg-facebook-blue ">{loading ? <div className="flex items-center justify-between"><ClipLoader color="#36d7b7" /><span className="font-bold">Please wait</span></div> : "Sign In"}</button>
                <p>New to FlexCart? <Link to="/sign-up"><span className="font-bold text-blue-700">Sign Up</span></Link></p>
            </form>

        </div>
    </>);
}

export default SignIn;