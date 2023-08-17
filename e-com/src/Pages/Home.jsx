import { useSelector } from "react-redux";
import { productSelector } from "../redux/reducers/products/productReducer";
import { BarLoader } from 'react-spinners'
import ProductCard from "../Components/ProductCard";
const Home = () => {
    const { items, status, isLoading } = useSelector(productSelector);

    return (<>
        {isLoading ? <div className="flex items-center justify-center "><BarLoader
            color="#9490e0"
            width={1920} /></div> : <div className="flex items-center justify-between">

            <div className="w-[70%] ">
                <div className="w-full flex items-center justify-center">
                    <h1 className="text-center font-bold text-[2rem] m-2">New Arrivals</h1>
                </div>
                <div className="flex flex-wrap items-center justify-between p-5">
                    {
                        items.products.map((product, i) => (
                            <ProductCard product={product} key={i} />
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col items-start w-[30%] fixed right-0 top-[100px] ">

                <input type="search" placeholder="Search here" className="w-[80%] border-2 border-blue-500 p-1 outline-0 h-[30px] sm:m-5 sm:h-[50px] sm:p-2" />
                    <div className="w-full flex items-center justify-center mt-[25px]">
                    <h1 className="font-bold text-2xl mb-[50px]">Categories</h1>
                    </div>
                

                <div className="flex items-center justify-between">
                    <input type="checkbox" id="smartphones" value="smartphones" className="m-1 sm:m-2" />
                    <label htmlFor="smartphones">Smartphones</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="laptops" value="laptops" className="m-1 sm:m-2" />
                    <label htmlFor="laptops">Laptops</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="fragrances" value="fragrances" className="m-1 sm:m-2" />
                    <label htmlFor="fragrances">Fragrances</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="skincare" value="skincare" className="m-1 sm:m-2" />
                    <label htmlFor="skincare">Skincare</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="groceries" value="groceries" className="m-1 sm:m-2" />
                    <label htmlFor="groceries">Groceries</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="home-decoration" value="home-decoration" className="m-1 sm:m-2" />
                    <label htmlFor="home-decoration">Home Decoration</label>
                </div>
                <div className="flex items-center justify-between">
                    <input type="checkbox" id="home-decoration" value="home-decoration" className="m-1 sm:m-2" />
                    <label htmlFor="home-decoration">Home Decoration</label>
                </div>
            </div>
        </div>}
    </>);
}

export default Home;
