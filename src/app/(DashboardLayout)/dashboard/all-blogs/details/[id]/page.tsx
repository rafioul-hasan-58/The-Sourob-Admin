'use client';
import BlogDetails from "@/components/modules/blog/BlogDetails";
import { getSingleBlog } from "@/services/blog";
import { IBlog } from "@/types/blog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const DetailsBlog = () => {
    const { id } = useParams();
    const [data, setData] = useState<IBlog>({} as IBlog);
    useEffect(() => {
        const fetchedBlog = async () => {
            const { data } = await getSingleBlog(id);
            setData(data)
        }
        fetchedBlog()
    }, [id])

    return (
        <div>
            <BlogDetails blog={data} />
        </div>
    );
};

export default DetailsBlog;