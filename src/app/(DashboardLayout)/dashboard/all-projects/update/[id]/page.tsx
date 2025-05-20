'use client';
import UpdateProjectForm from "@/components/modules/project/UpdateProjectForm";
import { getSingleProject } from "@/services/project";
import { IProject } from "@/types/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const UpdateProject = () => {
    const { id } = useParams();
    const [data, setData] = useState<IProject>({} as IProject);
    useEffect(() => {
        const fetchedProject = async () => {
            const { data } = await getSingleProject(id);
            setData(data)
        }
        fetchedProject()
    }, [id])

    return (
        <div>
            <UpdateProjectForm project={data} />
        </div>
    );
};

export default UpdateProject;