import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync, orderSelector } from "../redux/reducers/order/orderReducer";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import OrderCard from "../Components/OrderCard";
const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(orderSelector);
    const [loading,setLoading] = useState(false);
    const { uid } = useSelector(authSelector);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getOrdersAsync(uid))
            setLoading(false);
        },2000)
        
    }, [])
    return (<div className="h-[90vh] overflow-auto">
        {loading ? <div className="flex items-center justify-center "><BarLoader
            color="#36d7b7"
            width={1920} /></div> : orders.length === 0 ? <div className="p-5 w-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">You haven't ordered yet</h1>
            <Link to="/">
                <span className="text-[1.2rem] text-gray-400 flex items-center justify-between m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left m-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg><p>Order Now !</p></span>
            </Link>
        </div> : <div className="w-full  flex flex-col items-center justify-center">
            {orders.map((order,i) => (<OrderCard key={i} order = {order} />))}
        </div> }
    </div>);
}

export default Orders;