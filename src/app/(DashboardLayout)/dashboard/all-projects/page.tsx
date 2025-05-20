import AllProjectsPage from "@/components/modules/project/AllProjectsPage";
import { getAllProjects } from "@/services/project";

const AllProjects = async () => {
    const { data } = await getAllProjects();
    return (
        <div className="mx-8">
            <h1 className="text-3xl font-bold text-center mt-5 text-purple-500">Welcome to the project dashboard!</h1>
            <AllProjectsPage data={data} />
        </div>
    );
};

export default AllProjects;