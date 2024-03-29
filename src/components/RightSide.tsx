import { useState } from "react";
import { FaImage, FaPen } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Message from "./Message";

interface Message {
  text: string;
  isSender: boolean;
  name?: string;
}

const mockMessageList: Message[] = [
  {
    text: "Hello, this is a mock message",
    isSender: true,
    name: "John Doe",
  },
  {
    text: "This is another mock message",
    isSender: false,
    name: "Jane Doe",
  },
  {
    text: "And this is yet another mock message",
    isSender: true,
  },
  {
    text: "This is the last mock message",
    isSender: false,
    name: "Jane Doe",
  },
  //mock more
  {
    text: "Hello, this is a mock message",
    isSender: true,
    name: "John Doe",
  },
  {
    text: "This is another mock message",
    isSender: false,
    name: "Jane Doe",
  },
  {
    text: "And this is yet another mock message",
    isSender: true,
  },
  {
    text: "This is the last mock message",
    isSender: false,
  },
];

export default function RightSide() {
  const name = "Mock Username";
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>(mockMessageList);

  const handleSendMessage = () => {
    alert(inputMessage);
  };

  return (
    <div className="bg-[#3B3B3B] h-full text-white flex flex-col justify-between">
      <div className="h-[10%] py-4 bg-[#595260] flex items-center px-6 font-bold gap-4 text-medium">
        {name}
        <FaPen size={15} className="cursor-pointer" />
      </div>
      <div className="pt-6 pb-3 overflow-auto flex flex-col gap-2">
        {messageList.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <div className="h-[10%] bg-[#bfbec2] flex items-center ps-6 pe-4 py-2 relative">
        <FaImage size={30} color="#2C2E43" className="cursor-pointer" />
        <input
          className="bg-white ms-6 w-full h-[35px] 
          rounded-xl flex items-center justify-between
          ps-4 pe-2 text-black outline-1"
          placeholder="Message..."
          type="text"
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          value={inputMessage}
        />
        <MdSend
          color="#2C2E43"
          size={30}
          className="absolute right-[25px] cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
