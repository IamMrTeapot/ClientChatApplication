import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { mySocket } from "../config/socketClient";
import { socketEmitChannel } from "../types/SocketTypes";
import { useDispatch } from "react-redux";
import { updateGroupChat } from "../redux/features/chatSlice";

export default function CreateGroupChatModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [inputChatName, setInputChatName] = useState<string>("");
  const dispatch = useDispatch();

  const handleConfirm = () => {
    mySocket.emit(socketEmitChannel.JOIN_GROUP, inputChatName);
    dispatch(updateGroupChat({ identity: inputChatName, message: null }));
    onClose();
  };

  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="bg-[#E7E7E7] w-[40vw] p-4 flex flex-col items-center rounded-md">
        <h1 className="text-xl font-semibold uppercase mt-4">
          Create Group Chat
        </h1>
        <input
          type="text"
          className="border p-2 w-[80%] mt-4 rounded-md"
          placeholder="Group Name"
          value={inputChatName}
          onChange={(e) => setInputChatName(e.target.value)}
        />
        <div className="w-[80%] flex gap-2 justify-end mt-4 mb-2">
          <button
            className="bg-[#2C2E43] rounded-md text-white text-xs py-2 px-4 mt-2"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="bg-[#519D74] rounded-md text-white text-xs py-2 px-4 mt-2"
            onClick={handleConfirm}
          >
            confirm
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
