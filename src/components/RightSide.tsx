import { ChangeEvent, useState } from "react";
import { FaImage, FaPen } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import MessageList from "./MessageList";
import { useSelector } from "react-redux";
import { AppRootState } from "../redux/store";
import { mySocket } from "../config/socketClient";
import { socketEmitChannel } from "../types/SocketTypes";
import EditChatNameModal from "./EditChatNameModal";
import { formatUtils } from "../utils/formatUtils";
import { imageUtils } from "../utils/imageUtills";

export default function RightSide() {
  const name = useSelector(
    (state: AppRootState) => state.userSlice.selectedChatName
  );
  const { user : username ,selectedChatIdentity, selectedChatType } = useSelector(
    (state: AppRootState) => state.userSlice
  );

  const { users: allPrivateMessages, groups: allGroupMessages } = useSelector(
    (state: AppRootState) => state.chatSlice
  );

  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const [showEditChatNameModal, setShowEditChatNameModal] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if(selectedFile === undefined) {
        handleSendMessage()
      }else{
        handleSendImage()
      }
    }
  };

  const clearInput = () => {
    setInputMessage("");
    setSelectedFile(undefined);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
    
    // Debugging: Display the file name
    console.log(file?.name);
  };

  const handleSendImage = async() =>{
    if (!selectedFile) return;
    const base64Image = await imageUtils.convertToBase64(selectedFile);
    console.log(selectedChatType);
    if (selectedChatType === "groups") {
      mySocket.emit(
        socketEmitChannel.SEND_GROUP_MESSAGE,
        base64Image,
        selectedChatIdentity,
        false
      );
    } else if (selectedChatType === "users") {
      mySocket.emit(
        socketEmitChannel.SEND_PRIVATE_MESSAGE,
        base64Image,
        formatUtils.getTargetUsername(selectedChatIdentity || "",username || ""),
        false
      );

    }
    clearInput();
  }

  const handleSendMessage = () => {
    if (!inputMessage) return;
    console.log(selectedChatType);
    if (selectedChatType === "groups") {
      mySocket.emit(
        socketEmitChannel.SEND_GROUP_MESSAGE,
        inputMessage,
        selectedChatIdentity,
        true
      );
    } else if (selectedChatType === "users") {
      mySocket.emit(
        socketEmitChannel.SEND_PRIVATE_MESSAGE,
        inputMessage,
        formatUtils.getTargetUsername(selectedChatIdentity || "",username || ""),
        true
      );

    }
    clearInput();
  };

  return (
    <div className="bg-[#3B3B3B] h-full text-white flex flex-col justify-between">
      <div className="flex flex-col h-[90%]">
        <div className="h-[11%] py-4 bg-[#595260] flex items-center px-6 font-medium gap-4 text-xl">
          {name ?? "Please select a chat first"}
          <FaPen
            size={15}
            className="cursor-pointer"
            onClick={() => setShowEditChatNameModal(true)}
          />
        </div>
        {/* TODO: Add Private Chat and fix logic here */}
        {selectedChatIdentity && (
          <MessageList messageList={selectedChatType === "groups" ? allGroupMessages[selectedChatIdentity] : allPrivateMessages[selectedChatIdentity].messages} />
        )}
      </div>
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
          onKeyDown={handleKeyPress}
        />
        <MdSend
          color="#2C2E43"
          size={30}
          className="absolute right-[25px] cursor-pointer"
          onClick={selectedFile === undefined ? handleSendMessage : handleSendImage}
        />
      </div>
      {selectedChatType && showEditChatNameModal && (
        <EditChatNameModal
          isVisible={showEditChatNameModal}
          onClose={() => setShowEditChatNameModal(false)}
          isGroup={selectedChatType === "groups"}
        />
      )}
    </div>
  );
}
