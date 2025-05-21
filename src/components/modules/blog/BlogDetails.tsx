import { IBlog } from "@/types/blog";
import Image from "next/image";
import { format } from 'date-fns'
import { useEffect, useState } from "react";
interface DetailsBlog {
    blog: IBlog
}
const BlogDetails = ({ blog }: DetailsBlog) => {
    const fallbackImage = 'https://i.ibb.co/mryzXPbL/office-605503-1280.jpg';
    const [currentImg, setCurrentImg] = useState(blog?.images && blog.images[0]);

    useEffect(() => {
        if (blog?.images?.length > 0) {
            setCurrentImg(blog.images[0]);
        } else {
            setCurrentImg(fallbackImage)
        }
    }, [blog?.images])
    return (
        <div className="m-8 max-w-screen overflow-hidden bg-purple-100 dark:bg-gray-800">
            <div className="flex">
                {currentImg ? (
                    <Image
                        className=" w-full h-[450px] p-4.5"
                        src={currentImg}
                        width={600}
                        height={300}
                        alt="image"
                    />
                ) : (
                    <div className="w-[100px] h-[80px] flex items-center justify-center bg-gray-200 text-gray-500 border rounded">
                        No Image
                    </div>
                )}
                <div className="grid grid-cols-1 pt-4.5 my-0.5">
                    {
                        blog?.images?.length > 0 && blog.images.slice(0).map((img, idx) => (<Image key={idx} src={img} alt={img + idx} width={250} height={200} onClick={() => setCurrentImg(img)} className={`${currentImg === img ? 'border-2 border-purple-500' : ''}`} />))
                    }
                </div>
            </div>
            <div className="p-6">
                <div>
                    <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                        Blog
                    </span>
                    <a
                        href="#"
                        className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                    >
                        {blog.title}
                    </a>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {blog.description}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center">
                        <Image
                            className="object-cover h-10 rounded-full"
                            src="https://i.ibb.co/1JPrQPQh/portfolio.jpg"
                            alt="Avatar"
                            width={40}
                            height={50}
                        />
                        <div className="text-left">
                            <h1 className="mx-2 font-semibold text-gray-700">Rafioul Hasan</h1>
                            <p className="mx-1 text-xs text-gray-600 ml-2">{blog?.createdAt && format(new Date(blog.createdAt), 'dd, MMM, yyyy')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;