import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { useLocation, useSearchParams } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";
export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams,setSearchParams] = useSearchParams () ;
  const location = useLocation();
  useEffect(() => {
    const page = searchParams.get("page")??1;
    if (location.pathname.includes("tags")) {
      const tag= location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),tag);
    }
    else if (location.pathname.includes("categories")) {
      const category= location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),null,category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname,location.search]);

  return (
    <Routes>
      <Route path="/blogs-context" element = {<Home/>}/>
      <Route path="/blogs-context/blog/:blogId" element= {<BlogPage/>}/>
      <Route path="/blogs-context/tags/:tag" element= {<TagPage/>}/>
      <Route path="/blogs-context/categories/:category" element= {<CategoryPage/>}/>
    </Routes>
  );
}
