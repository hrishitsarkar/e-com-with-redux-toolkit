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

        </div> : <div className="flex w-[95%] items-center justify-center flex-col overflow-y-scroll max-h-[65vh]">
                <div className="w-[90%] mt-[200px] border-b-2 border-black flex items-center justify-around">
                    <h1>Product</h1>
                    <h1>Price</h1>
                    <h1>Quantity</h1>
                    <h1>Total</h1>
                    
                </div>
                {cartItems.map((item) => ((
            
            <CartCard item={item} />
        )))}
        </div>}
                
    </>);
}

export default Cart;