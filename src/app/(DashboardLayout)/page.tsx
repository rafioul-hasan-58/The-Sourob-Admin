import MessageCard from "@/components/modules/message/MessageCard";
import { getAllMessages } from "@/services/message";

const AllMessages = async () => {
    const { data } = await getAllMessages();
    console.log(data);
    return (
        <div className="mx-8">
            <h1 className="text-3xl font-bold text-center mt-5 text-purple-500">Welcome to the project dashboard!</h1>
            <MessageCard data={data} />
        </div>
    );
};

export default AllMessages;