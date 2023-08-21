const CartCard = ({ item }) => {
    console.log(item)
    return (
        <div className="p-2 flex items-center justify-between w-[90%] m-2 border-b-2 border-black">
            <div className="w-[15%] flex items-center justify-center">
                <img className="w-[130px] h-[130px]" src={item.thumbnail} />
                <div className="flex items-center flex-col justify-start m-2">
                    <h2 className="text-[1.2rem]">{item.title}</h2>
                    <span className="w-full flex items-center justify-start "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ml-2" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                        <p className="ml-2">{item.rating}</p>
                    </span>
                    <p className="text-gray-400 hover:text-red-600 cursor-pointer mt-5 text-[1.1rem]">Remove</p>
                </div>
            </div>

            <div className="flex items-center justify-start text-[1.2rem]">
                <p>&#8377;{item.price * item.qty}</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-[200px] border-[1px] border-black rounded-lg text-2xl h-[50px] flex items-center justify-around">
                    <button>-</button>
                    <p>{item.qty}</p>
                    <button>+</button>
                </div>
            </div>
        </div>);
}

export default CartCard;