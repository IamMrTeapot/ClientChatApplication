import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { useDispatch, useSelector } from "react-redux";
import { updatePrivateChatName } from "../redux/features/chatSlice";
import { AppRootState } from "../redux/store";

export default function EditChatNameModal({
  isVisible,
  onClose,
  isGroup,
}: {
  isVisible: boolean;
  onClose: () => void;
  isGroup: boolean;
}) {
  const [inputChatName, setInputChatName] = useState<string>("");
  const selectedChatIdentity = useSelector(
    (state: AppRootState) => state.userSlice.selectedChatIdentity
  );
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (isGroup) {
      //TODO: implement updating group chat name
      alert("Updating group chat name is not implemented yet!");
    } else {
      if (!selectedChatIdentity) return;
      dispatch(
        updatePrivateChatName({
          identity: selectedChatIdentity,
          nickname: inputChatName,
        })
      );
    }
    onClose();
  };

  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="bg-[#E7E7E7] w-[40vw] p-4 flex flex-col items-center rounded-md text-black">
        <h1 className="text-xl font-semibold uppercase mt-4">
          Edit {isGroup ? "Group" : "Chat"} Name
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
