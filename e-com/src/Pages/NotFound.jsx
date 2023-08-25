import noImage from './404.png'

const NotFound = () => {
    return (<div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className='font-bold text-[2.5rem] text-gray-400'>404</h1>
        <p className='font-bold text-[1.8rem]'>Page Not Found</p>
        <img src={noImage} className='m-2' />

    </div>);
}

export default NotFound;