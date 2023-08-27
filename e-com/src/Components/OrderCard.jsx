const OrderCard = ({ order }) => {
    //destructuring cart array from order
    const { cart } = order;
    return (<div className="flex p-1 w-[95%] flex-col items-center justify-start m-5">
        <div className="m-2 w-[80%] flex flex-col items-start justify-between border-b-2 border-gray-400">
            <h1 className=" m-2 text-[1.2rem] sm:text-2xl font-bold ">Order Placed on : {order.orderedAt}</h1>
            <h1 className="m-2 text-[1.2rem] sm:text-2xl">Order ID : {order.id}</h1>
            <p className="m-2 text-gray-400">Rs. {order.total} /-</p>
        </div>
        <div className="flex m-2 w-[80%]  flex-col items-start justify-between ">
            <h1 className="m-5 font-bold text-2xl">Shipment : {cart.length} items </h1>
            {cart.map((c) => (<div className="m-2 w-[90%] flex items-center justify-between">
                <img src={c.image} className=" w-[100px] h-[100px]" />
                <p className="ml-5 h-[100px] w-[80%] overflow-hidden">{c.description}</p>
            </div>))}
            <h1 className=" text-[1.2rem] text-gray-400">Expected delivery by </h1>
            <p className="">Friday , January 5 , 2099</p>
        </div>



    </div>);
}

export default OrderCard;