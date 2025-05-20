'use client'
import Swal from 'sweetalert2'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { IBlog } from "@/types/blog";
import { deleteBlog } from '@/services/blog';

interface IAllBlogs {
    data: IBlog[]
}
const AllBlogsPage = ({ data }: IAllBlogs) => {
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteBlog(id);
                    console.log(res);
                    if (res.success) {
                    }
                } catch (error) {
                    console.log(error);
                }
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };
    return (
        <div className="mt-5">
            <Table className="border">
                <TableHeader className=" bg-purple-500 rounded-t-xl">
                    <TableRow className="text-white">
                        <TableHead className="text-white">Image</TableHead>
                        <TableHead className="text-white">Title</TableHead>
                        <TableHead className="text-white">View</TableHead>
                        <TableHead className="text-white">Update</TableHead>
                        <TableHead className="text-white">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((blog: IBlog, idx) => (<TableRow className="bg-gray-50" key={idx}>
                            <TableCell className="font-medium">
                                <Image className="border" src={blog.images[0]} width={100} height={80} alt="image" />
                            </TableCell>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell className="">
                                <Button size="sm" variant="outline" className="bg-purple-500 text-white h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </TableCell>
                            <TableCell className="">
                                <Link href={`/dashboard/all-blogs/update/${blog._id}`}>
                                    <Button size="sm" className="bg-green-500">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell className="">
                                <Button size="sm" onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white h-8 w-8 p-0">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>))
                    }
                </TableBody>
            </Table>

        </div>
    );
};

export default AllBlogsPage;