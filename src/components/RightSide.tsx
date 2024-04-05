import { ChangeEvent, useState } from "react";
import { FaImage, FaPen } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import MessageList from "./MessageList";
import { IMessage } from "./Message";
import { useSelector } from "react-redux";
import { AppRootState } from "../redux/store";

const mockMessageList: IMessage[] = [
  {
    text: "Hi John, how are you?",
    isSender: true,
    name: "Jane Doe",
  },
  {
    text: "I'm good, Jane. Thanks for asking. How about you?",
    isSender: false,
    name: "John Doe",
  },
  {
    text: "I'm doing well, thank you. Are you ready for the meeting today?",
    isSender: true,
    name: "Jane Doe",
  },
  {
    text: "Yes, I've prepared the documents. See you there.",
    isSender: false,
    name: "John Doe",
  },
  {
    text: "Great, see you at the meeting.",
    isSender: true,
    name: "Jane Doe",
  },
  {
    text: "Sure, see you there.",
    isSender: false,
    name: "John Doe",
  },
  {
    text: "Bye for now.",
    isSender: true,
    name: "Jane Doe",
  },
  {
    text: "Goodbye, Jane.",
    isSender: false,
    name: "John Doe",
  },
];
export default function RightSide() {
  const name = useSelector(
    (state: AppRootState) => state.userSlice.selectedChatName
  );

  const { selectedChatIdentity, selectedChatType } = useSelector(
    (state: AppRootState) => state.userSlice
  );

  const { users: allPrivateMessages, groups: allGroupMessages } = useSelector(
    (state: AppRootState) => state.chatSlice
  );

  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);

    // Debugging: Display the file name
    console.log(file?.name);
  };

  const handleSendMessage = () => {
    alert(inputMessage);
  };

  return (
    <div className="bg-[#3B3B3B] h-full text-white flex flex-col justify-between">
      <div className="h-[10%] py-4 bg-[#595260] flex items-center px-6 font-medium gap-4 text-xl">
        {name ?? "Please select a chat first"}
        <FaPen size={15} className="cursor-pointer" />
      </div>
      {selectedChatIdentity && (
        <MessageList messageList={allGroupMessages[selectedChatIdentity]} />
      )}
      <div className="h-[10%] bg-[#bfbec2] flex items-center ps-6 pe-4 py-2 relative">
        <label htmlFor="file-input">
          <FaImage size={30} color="#2C2E43" className="cursor-pointer" />
        </label>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
        />
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
