import React from 'react'
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';

const TagPage = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const tag = location.pathname.split("/").at(-1);
  return (
    <div>
        <Header/>
        <div className='my-[100px]'>
            <div className='mt-[100px] mb-6 max-w-2xl mx-auto flex items-center space-x-2'>
                <button className='border-2 border-gray-300 py-1 px-4 rounded-md' onClick={()=>Navigate(-1)}>
                    Back
                </button>
                <h2 className='text-xl font-bold'>
                    Blogs Tagged <span className="underline text-blue-700">#{tag.replaceAll("-"," ")}</span>
                </h2>
            </div>
            <Blogs/>
            <Pagination/>
        </div>
    </div>
  );
}

export default TagPage;