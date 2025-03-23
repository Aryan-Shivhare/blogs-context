import React, { useContext, useState } from 'react'
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
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
        <div>
            <button onClick={()=>Navigate(-1)}>
                back
            </button>
        </div>
        {
            loading ? 
            (<div>
                <p>Loading</p>
            </div>) : 
            blog ? 
            (<div>
                <BlogDetails post={blog}/>
                <h2>Related Blogs</h2>
                {
                    relatedBlogs.map((post)=>(
                        <div key={post.id}>
                            <BlogDetails post={post}/>
                        </div>
                    ))
                }
            </div>) : 
            (<div>
                <p>No Blog Found</p>
            </div>
            )
        }
    </div>
  );
}

export default BlogPage;