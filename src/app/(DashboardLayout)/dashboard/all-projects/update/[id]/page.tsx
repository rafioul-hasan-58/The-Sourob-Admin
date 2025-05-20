import UpdateProjectForm from "@/components/modules/project/UpdateProjectForm";
import { getSingleProject } from "@/services/project";
interface PageProps {
    params: { id: string }
}
const UpdateProject = async ({ params }: PageProps) => {
    const { data } = await getSingleProject(params.id);
    return (
        <div>
            <UpdateProjectForm project={data} />
        </div>
    );
};

export default UpdateProject;