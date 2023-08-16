const SignIn = () => {
    return (<>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
  <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
</svg>
            <form className="flex flex-col items-center justify-between ">
                <input type="email" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg" placeholder="Enter Email" required />
                <input type="password" className="m-2 p-2 border-[1px] border-blue-500 rounded-lg" placeholder="Enter Password" required />
                <button type="submit" className="bg-black m-2 p-2 text-white font-bold shadow-2xl rounded-lg hover:bg-blue-500">Sign In</button>
            </form>

        </div>
    </>);
}

export default SignIn;