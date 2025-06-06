'use client';
import EditBlogForm from "@/components/modules/blog/EditBlogForm";
import { getSingleBlog } from "@/services/blog";
import { IBlog } from "@/types/blog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const UpdateBlog = () => {
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
            <EditBlogForm blog={data} />
        </div>
    );
};

export default UpdateBlog;