import { IMessage } from "@/types/message";
import { Mail, MapPin, User } from "lucide-react";



interface AllMessages {
    data: IMessage[]
}
const MessageCard = ({ data }: AllMessages) => {
    return (
        <div className="grid grid-cols-3 mt-5 gap-3">
            {
                data?.map((message: IMessage, idx) => (
                    <div
                        key={message._id || idx}
                        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-200 dark:border-gray-700"
                    >
                        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
                            {message.subject}
                        </h3>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                            {message.message}
                        </p>

                        <div className="space-y-1 text-sm text-purple-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <User size={16} /> <span>{message.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} /> <span>{message.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} /> <span>{message.address}</span>
                            </div>
                        </div>
                    </div>))
            }
        </div>
    );
};

export default MessageCard;