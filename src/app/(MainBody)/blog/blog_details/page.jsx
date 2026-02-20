"use client";
import BlogDetails from "@/Components/Blog/BlogDetails";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import Layout5 from "@/Layout/Layout5";
import { GETBLOGDATA } from "@/ReduxToolkit/Reducers/BlogReducer";
import { getAPIData } from "@/Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogDetailsPage = () => {
  const dispatch = useDispatch();
  const { blogdata } = useSelector((state) => state.BlogReducer);

  useEffect(() => {
    if (!blogdata || blogdata.length === 0) {
      getAPIData("/api/blog").then((res) => {
        dispatch(GETBLOGDATA(res?.data || []));
      });
    }
  }, [blogdata, dispatch]);

  return (
    <Layout5>
      <BreadCrumb parent="About Us" title="About Us" />
      <BlogDetails />
    </Layout5>
  );
};

export default BlogDetailsPage;
