import spirit from './spirit.png'
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
    return (<>
        <nav className="flex items-center h-[70px] justify-between bg-black p-4 ">
            <Link to='/'>
                <div className="sm:w-[50%] flex items-center justify-start">
                    <img
                        src={spirit}
                        className='w-[40px] h-[40px] m-2'
                    />
                    <h1 className="text-white font-bold m-2 text-2xl ">FlexCart</h1>

                </div>
            </Link>

            <div className='w-[50%] flex items-center justify-end'>
                <NavLink to="/sign-up" style={({ isActive }) => ({

                    backgroundColor: isActive ? 'white' : 'black',
                    color: isActive ? 'black' : 'white'
                })}>
                    <div className='flex  w-auto flex-col items-center justify-between m-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                        </svg>
                        <span className='font-bold hidden sm:block'>Sign Up</span>
                    </div>
                </NavLink>
                <NavLink to="/sign-in" style={({ isActive }) => ({

                    backgroundColor: isActive ? 'white' : 'black',
                    color: isActive ? 'black' : 'white'
                })}>
                    <div className='flex  w-auto flex-col items-center justify-between m-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-lock" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
                        </svg>
                        <span className='font-bold hidden sm:block'>Sign In</span>
                    </div>
                </NavLink>
                <Link to="/cart">
                    <div className='flex h-[54px] w-auto items-center justify-between '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="m-1 bi bi-bag-fill text-white text-2xl" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                        </svg>
                        <span className='flex items-center'>
                            <span className='flex items-center w-[25px] h-[25px] justify-center bg-red-600 rounded-[50%] text-white text-[1.2rem]'>3</span>
                        </span>
                    </div>
                </Link>
            </div>

        </nav>
    </>);
}

export default Navbar;