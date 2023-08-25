import { useDispatch, useSelector } from "react-redux";
import { productActions, productSelector, productsFetch } from "../redux/reducers/products/productReducer";
import { BarLoader } from 'react-spinners'
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { getCartAsync } from "../redux/reducers/cart/cartReducer";
const Home = () => {
    //storing the value of search input field when user searches
    const [searchTerm, setSearchTerm] = useState("");
    //storing the checkbox value if users checked
    const [productFilter, setProductFilter] = useState([]);
    ////storing the range value if users select the price range
    const [priceRange, setPriceRange] = useState(0);
    const [initialPriceRange, setInitialPriceRange] = useState(30000);
    //destructuring items,isLoading,searchResults from selector
    const { items, status, isLoading, searchResults } = useSelector(productSelector);
    //local component state toggler for conditional rendering
    const [isSearching, setIsSearching] = useState(false);
    //destructuring uid from selector
    const { uid } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            //dispatching async operation to get the products from database while the page mounts
            dispatch(productsFetch());
            //dispatching async operation to get the cart 
            dispatch(getCartAsync(uid));
        }, 2000)


    }, [])
    useEffect(() => {
        //filter function works if user searches or filter
        handleFilter();
        //toggling isSearching to render from searchResults array
        setIsSearching(searchTerm || productFilter.length > 0 || priceRange > 0);


    }, [searchTerm, productFilter, priceRange])
    //handler for range
    const handleRange = (e) => {
        //storing the value of range
        setInitialPriceRange(e.target.value);
        setPriceRange(e.target.value);
    }
    //handler for search
    const handleChange = (e) => {
        //storing the value of search
        setSearchTerm(e.target.value);
    }
    //handler for checkbox
    const handleCheckbox = (e) => {
        //storing value
        const value = e.target.value;
        //storing if isChecked
        const isChecked = e.target.checked;
        //if true the we add the value else we filter out the value 
        if (isChecked) {
            setProductFilter([...productFilter, value]);
        } else {
            setProductFilter(productFilter.filter((p) => p !== value));
        }


    }
    //function to handle the filtering
    const handleFilter = () => {
        let filteredProducts = [];
        //filtering with range , search and checkbox all at once
        if (items && items.length > 0) {
            filteredProducts = items.filter((product) => (


                (product.price <= Number(initialPriceRange)) &&
                (productFilter.length === 0 || productFilter.includes(product.category)) &&
                (searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase())))
            );

        }
        //dispatching the action to update state in redux
        dispatch(productActions.updateSearchResults(filteredProducts));
    }

    return (<>
        {isLoading ? <div className="flex items-center justify-center "><BarLoader
            color="#36d7b7"
            width={1920} /></div> : <div className="flex items-center justify-between">

            <div className="w-[70%] overflow-y-scroll h-[90vh] pb-[50px] ">
                <div className="w-full flex items-center justify-center">
                    <h1 className="text-center font-bold text-[2rem] m-2">New Arrivals</h1>

                </div>
                <div className="flex flex-wrap items-center justify-between p-5">
                    {isSearching ? searchResults.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    )) :
                        items.map((product, i) => (
                            <ProductCard product={product} key={i} />
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col items-start w-[30%] fixed right-0 top-[100px] ">

                <input type="search" placeholder="Search here" className="w-[80%] border-2 border-blue-500 p-1 outline-0 h-[25px] rounded-full sm:m-5 sm:h-[50px] sm:p-2" onChange={handleChange} />
                <div className="flex flex-col items-center justify-center w-full">
                    <p className="text-[0.8rem] m-1 sm:text-[1rem]">Price : {initialPriceRange}</p>
                    <input type="range" onChange={handleRange} step={1} value={initialPriceRange} min={0} max={30000} className="w-[50%] m-1" />

                </div>
                <div className="w-full flex items-center justify-center mt-[25px]">
                    <h1 className="font-bold text-[1rem]  mb-[50px] sm:text-2xl">Categories</h1>
                </div>


                <div className="flex items-center justify-between">
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes("men")} id="men" value="men" className="m-1 sm:m-2" />
                    <label htmlFor="smartphones" className="text-[0.8rem] sm:text-[1rem]">Men's Clothing</label>
                </div>

                <div className="flex items-center justify-between">
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes('jewelery')} id="jewelery" value="jewelery" className="m-1 sm:m-2" />
                    <label htmlFor="fragrances" className="text-[0.8rem] sm:text-[1rem]">Jewelery</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes('electronics')} id="electronics" value="electronics" className="m-1 sm:m-2" />
                    <label htmlFor="skincare" className="text-[0.8rem] sm:text-[1rem]">Electronics</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes("women")} id="women" value="women" className="m-1 sm:m-2" />
                    <label htmlFor="groceries" className="text-[0.8rem] sm:text-[1rem]">Women's Clothing</label>
                </div>


            </div>
        </div>}
    </>);
}

export default Home;
