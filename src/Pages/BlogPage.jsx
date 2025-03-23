import React, { useContext, useState } from 'react'
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog,setBlog] = useState(null);
    const [relatedBlogs,setRelatedBlogs] = useState ([]);
    const Navigate = useNavigate();
    const location = useLocation();
    const {setLoading,loading} = useContext(AppContext);
    const blogId = location.pathname.split("/").at(-1);
    async function fetchRelatedBlogs () {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch (error) {
            console.log("Error occurs")
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (blogId) {
            fetchRelatedBlogs();
        }
    },[location.pathname])
  return (
    <div>
        <Header/>
        <div className="mt-[100px] mb-6 max-w-2xl mx-auto">
            <button className="border-2 border-gray-300 py-1 px-4 rounded-md" onClick={()=>Navigate(-1)}>
                Back
            </button>
        </div>
        {
            loading ? 
            (<div className="min-h-[80vh] w-full flex justify-center items-center">
                <p className="text-center font-bold text-3xl">Loading ...</p>
            </div>) : 
            blog ? 
            (<div>
                <BlogDetails post={blog}/>
                <h2 className='max-w-2xl mx-auto mt-12 font-bold text-3xl mb-8'>Related Blogs</h2>
                {
                    relatedBlogs.map((post)=>(
                        <div className="flex flex-col gap-y-10 my-4" 
                        key={post.id}>
                            <BlogDetails post={post}/>
                        </div>
                    ))
                }
            </div>) : 
            (<div className="min-h-[80vh] w-full flex justify-center items-center">
                <p className="text-center font-bold text-3xl">No Blogs Found !</p>
            </div>
            )
        }
    </div>
  );
}

export default BlogPage;