import { useDispatch, useSelector } from "react-redux";
import { productActions, productSelector, productsFetchFromApi } from "../redux/reducers/products/productReducer";
import { BarLoader } from 'react-spinners'
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import { authSelector } from "../redux/reducers/auth/authReducer";
import { getCartAsync } from "../redux/reducers/cart/cartReducer";
const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [productFilter, setProductFilter] = useState([]);
    const [priceRange, setPriceRange] = useState(0);
    const [initialPriceRange,setInitialPriceRange] = useState(30000);
    const { items, status, isLoading,searchResults } = useSelector(productSelector);
    console.log(items)
    const { uid } = useSelector(authSelector);
    const dispatch = useDispatch();
    const handleRange = (e) => {
        setPriceRange(e.target.value)
    }
    const handleChange = (e) => {
        setInitialPriceRange(e.target.value)
        setSearchTerm(e.target.value);
    }
    const handleCheckbox = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if(isChecked){
            setProductFilter([...productFilter,value]);
        }else{
            setProductFilter(productFilter.filter((p) => p !== value));
        }

        


    }
    const handleFilter = () => {
        let filteredProducts = [];
        
        if (items && items.length > 0) {
            filteredProducts = items.filter((product) => (


                (product.price <= Number(priceRange)) &&
                (productFilter.length === 0 || productFilter.includes(product.category)) &&
                (searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }
        
        dispatch(productActions.updateSearchResults(filteredProducts));
    }
    useEffect(() => {
        dispatch(getCartAsync(uid));
    }, [])
    useEffect(() => {
        handleFilter();
    }, [productFilter,searchTerm,priceRange])
    return (<>
        {isLoading ? <div className="flex items-center justify-center "><BarLoader
            color="#36d7b7"
            width={1920} /></div> : <div className="flex items-center justify-between">

            <div className="w-[70%] overflow-y-scroll h-[90vh] pb-[50px] ">
                <div className="w-full flex items-center justify-center">
                    <h1 className="text-center font-bold text-[2rem] m-2">New Arrivals</h1>
                    
                </div>
                <div className="flex flex-wrap items-center justify-between p-5">
                    {searchTerm || productFilter.length > 0 || priceRange  ? searchResults.map((product, i) => (
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
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes(`men's clothing`)} id= {`men's clothing`} value={`men's clothing`} className="m-1 sm:m-2" />
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
                    <input type="checkbox" onChange={handleCheckbox} checked={productFilter.includes(`women's clothing`)} id={"women's clothing"}  value={"women's clothing"} className="m-1 sm:m-2" />
                    <label htmlFor="groceries" className="text-[0.8rem] sm:text-[1rem]">Women's Clothing</label>
                </div>
                

            </div>
        </div>}
    </>);
}

export default Home;
