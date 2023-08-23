import { useDispatch, useSelector } from "react-redux";
import { decreaseQtyAsync, deleteFromCartAsync, increaseQtyAsync } from "../redux/reducers/cart/cartReducer";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const CartCard = ({ item }) => {
    const dispatch = useDispatch();
    const { uid } = useSelector(authSelector)
    const [loading, setLoading] = useState(false)
    const removeFromCart = (item) => {
        
        setLoading(true);
        setTimeout(() => {
            dispatch(deleteFromCartAsync({item, uid }))
            setLoading(false)
        },1000)

    }
    const decrease = (item) => {
        dispatch(decreaseQtyAsync({item,uid}))
    }
    const increase = (item) => {
        dispatch(increaseQtyAsync({item,uid}));
    }
    return (
        <div className="p-2 flex items-center justify-between w-[90%] m-2 border-b-2 border-black">
            <div className="w-[25%] sm:w-[15%] flex items-center justify-center">
                <img className="ml-[35px] w-[400px] h-[100px] sm:w-[130px] sm:h-[130px]" src={item.image} />
                <div className="flex items-center flex-col justify-start m-2">
                    <h2 className="text-[0.9rem] sm:text-[1.2rem] h-[90px] overflow-hidden">{item.title}</h2>
                    <span className="w-full flex items-center justify-start "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ml-2" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                        <p className="ml-2 text-[0.8rem] sm:text-[1rem]">{item.rating.rate}</p>
                    </span>
                    <button onClick={() => removeFromCart(item)} className="text-gray-400 bg-red-600 text-white rounded-lg cursor-pointer mt-5 text-[0.8rem] p-1 sm:text-[1.1rem]">{loading ? <div className="flex items-center justify-center"><ClipLoader color="#36d7b7" /></div> : "Remove" }</button>
                </div>
            </div>

            <div className="flex items-center justify-start text-[0.9rem] sm:text-[1.2rem]">
                <p>&#8377;{item.price * item.qty}</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-[50px] sm:w-[200px] sm:border-[1px] border-black rounded-lg text-[1.1rem] sm:text-2xl h-[30px] sm:h-[50px] flex items-center justify-around">
                    <button onClick={() => decrease(item)}>-</button>
                    <p>{item.qty}</p>
                    <button onClick={() => increase(item)}>+</button>
                </div>
            </div>
        </div>);
}

export default CartCard;