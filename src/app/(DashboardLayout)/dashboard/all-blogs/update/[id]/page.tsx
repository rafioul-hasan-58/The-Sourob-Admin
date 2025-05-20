import EditBlogForm from "@/components/modules/blog/EditBlogForm";
import { getSingleBlog } from "@/services/blog";



interface PageProps {
    params: { id: string }
}
const UpdateBlog = async ({ params }: PageProps) => {
    const { id } = params;
    const { data } = await getSingleBlog(id);
    return (
        <div>
            <EditBlogForm blog={data} />
        </div>
    );
};

export default UpdateBlog;