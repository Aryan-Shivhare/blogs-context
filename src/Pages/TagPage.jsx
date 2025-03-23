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
        <div>
            <button onClick={()=>Navigate(-1)}>
                back
            </button>
            <h2>
                Blogs tagged <span>#{tag}</span>
            </h2>
        </div>
        <Blogs/>
        <Pagination/>
    </div>
  );
}

export default TagPage;