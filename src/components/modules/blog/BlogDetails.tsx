import { IBlog } from "@/types/blog";
import Image from "next/image";

interface DetailsBlog {
    blog: IBlog
}
const BlogDetails = ({ blog }: DetailsBlog) => {
    console.log(blog);
    return (
        <div className="m-8 max-w-screen overflow-hidden bg-purple-100 dark:bg-gray-800">
            {blog?.images && blog?.images.length > 0 && blog?.images[1] ? (
                <Image
                    className=""
                    src={blog?.images[0]}
                    width={600}
                    height={300}
                    alt="image"
                />
            ) : (
                <div className="w-[100px] h-[80px] flex items-center justify-center bg-gray-200 text-gray-500 border rounded">
                    No Image
                </div>
            )}

            <div className="p-6">
                <div>
                    <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                        Product
                    </span>
                    <a
                        href="#"
                        className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                    >
                        I Built A Successful Blog In One Year
                    </a>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
                        parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
                        egestas quam volutpat viverra. In pretium nec senectus erat. Et
                        malesuada lobortis.
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center">
                        <Image
                            className="object-cover h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                            alt="Avatar"
                            width={40}
                            height={50}
                        />
                        <a
                            href="#"
                            className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Jone Doe
                        </a>
                        <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                            21 SEP 2015
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;