import AllBlogsPage from "@/components/modules/blog/AllBlogsPage";
import { getAllBlogs } from "@/services/blog";

const AllBlogs = async () => {
    const { data } = await getAllBlogs();
    return (
        <div className="mx-8">
            <h1 className="mt-3 text-3xl font-bold text-center text-purple-500">Your All Blogs are here</h1>
            <AllBlogsPage data={data} />
        </div>
    );
};

export default AllBlogs;