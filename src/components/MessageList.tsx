import Message from "./Message";
import { IMessage } from "./RightSide";

export default function MessageList({
  messageList,
}: {
  messageList: IMessage[];
}) {
  return (
    <div
      className="pt-6 pb-3 overflow-auto flex flex-col gap-2 
scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-[#3B3B3B]"
    >
      {messageList.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}
