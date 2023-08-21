import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { cartSelector, getCartAsync } from "../redux/reducers/cart/cartReducer";
import CartCard from "../Components/CartCard";
import { Link } from "react-router-dom";

const Cart = () => {
    const { uid } = useSelector(authSelector);
    const { cartItems } = useSelector(cartSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartAsync(uid));
    }, [])
    return (<>
        <h1 className="text-center m-2 font-bold text-[2rem]">Shopping Cart</h1>
        {cartItems.length === 0 ? <div className="flex items-center justify-center flex-col">
            <h1 className="font-bold text-2xl m-5">Your cart is empty !</h1>
            <Link to="/">
                <span className="text-[1.2rem] text-red-700 flex items-center justify-between m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left m-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg><p>Start Shopping !</p></span>
            </Link>

        </div> : <><div className="flex w-[95%] items-center justify-center flex-col overflow-y-scroll max-h-[54vh]">
            <div className="w-[90%] mt-[200px] border-b-2 border-black flex items-center justify-between p-2">
                <h1 className="font-bold">Product</h1>
                <h1 className="font-bold">Price</h1>
                <h1 className="font-bold">Quantity</h1>


            </div>
            {cartItems.map((item) => ((

                <CartCard item={item} />
            )))}

        </div>
            <div className="flex h-[100%] w-full items-center justify-between p-5">
                <button className="w-[200px] h-[50px] rounded-lg text-white text-[1.2rem] bg-gradient-to-r from-cyan-500 to-blue-500">Clear Cart</button>
                <div className="flex w-[20%] items-center justify-start flex-col">
                    <div className="flex w-full m-1 items-center justify-between">
                        <h1 className="text-[1.2rem] font-bold">Subtotal</h1>
                        <h1 className="text-[1.2rem] font-bold">&#8377;0</h1>
                    </div>
                    <h1 className="w-full text-[1.2rem] m-1">Delivery <span className="text-green-500">Free</span></h1>
                    <div className="m-1 w-full flex items-center justify-between">
                        <p className="w-full">100% Authentic Products</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill text-blue-500" viewBox="0 0 16 16">
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                        </svg>
                    </div>
                    <button className=" m-1 w-[200px] h-[40px] text-[1.3rem] text-white bg-facebook-blue rounded-lg hover:bg-black">Check Out</button>
                    <Link to="/">
                        <span className="m-1 text-[1.2rem] text-gray-700 flex items-center justify-between"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left m-1" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg><p>Continue Shopping</p></span>
                    </Link>
                </div>
            </div></>}

    </>);
}

export default Cart;