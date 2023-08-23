import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { addToCartAsync } from "../redux/reducers/cart/cartReducer";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const ProductCard = ( {product} ) => {
    const { isLoggedIn, uid } = useSelector(authSelector);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const addToCart = (product) => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(addToCartAsync({ product, uid }))
            setIsLoading(false);
        }, 1000)

    }
    return (
        <div className="flex flex-col  shadow-2xl hover:shadow-2xl hover:shadow-indigo-500/40 w-[300px] items-center p-2 m-2">
            <h1 className="text-2xl m-2">{product.title}</h1>
            <img src={product.image
            }
                className="w-[250px] h-[250px] m-2"

            />
            <p className="m-2 overflow-hidden h-[100px]">{product.description}</p>
            <div className="flex items-center justify-between w-full m-2">
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill m-1 inline-block" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <p>{product.rating.rate}</p>

                </span>
                <span>
                    <h1 className="font-bold">&#8377;{product.price}</h1>
                </span>
            </div>
            <button onClick={() => {isLoggedIn ? addToCart(product) : navigate('/sign-in') }} className="w-[80%] bg-facebook-blue text-white m-2 h-[50px] rounded-lg font-bold">{isLoading ? <div className="flex items-center justify-center"><ClipLoader color="#36d7b7" /><span className="font-bold">Adding...</span></div> : "Add to Cart"}</button>
        </div>);
}

export default ProductCard;