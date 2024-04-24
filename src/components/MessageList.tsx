import { useEffect, useRef } from "react";
import Message, { IMessage } from "./Message";

export default function MessageList({
  messageList,
}: {
  messageList: IMessage[];
}) {
  const messageListRef = useRef<HTMLDivElement>(null);

  //2️⃣ watch for when new items are added
  useEffect(() => {
    //3️⃣ bring the last item into view
    messageListRef.current?.lastElementChild?.scrollIntoView();
  }, [messageList]);

  return (
    <div
      className="pt-6 pb-3 overflow-auto flex flex-col gap-2 
scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-[#3B3B3B]"
      ref={messageListRef}
    >
      {messageList.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}
