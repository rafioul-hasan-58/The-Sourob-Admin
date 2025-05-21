'use client';
import ProjectDetails from "@/components/modules/project/ProjectDetails";
import { getSingleProject } from "@/services/project";
import { IProject } from "@/types/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const DetailsProject = () => {
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
            <ProjectDetails project={data} />
        </div>
    );
};

export default DetailsProject;