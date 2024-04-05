import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import JoinChatDropDown from "./JoinChatDropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectChat } from "../redux/features/userSlice";

const focusClasses = "bg-white text-black border-2 border-black";
const blurClasses = "bg-[#9a979f] text-white";

export interface IDropdownItem {
  name: string;
  identity: string;
  hasModal: boolean;
}

export default function DropdownItem({
  name,
  identity,
  hasModal,
}: IDropdownItem) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedChatIdentity } = useSelector(
    (state: RootState) => state.userSlice
  );
  const isFocus = selectedChatIdentity === identity;

  const handleJoinChat = (name: string, identity: string) => {
    //TODO: implement joining chat
    alert(`Joining chat with ${name} ${identity}`);
  };

  const handleSelectChat = (name: string, identity: string) => {
    if (hasModal) return;
    dispatch(selectChat({ name, identity }));
  };

  return (
    <div
      className={`w-[95%] h-[40px] rounded-md 
    flex items-center ps-4 pe-2 justify-between cursor-pointer box-border
    ${isFocus && !hasModal ? focusClasses : blurClasses}`}
      onClick={() => handleSelectChat(name, identity)}
    >
      <p>{name}</p>
      {hasModal && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(!isModalOpen);
          }}
          className="relative cursor-pointer"
        >
          <PiDotsThreeOutlineVerticalFill />
          {isModalOpen && (
            <JoinChatDropDown
              isGroup={false}
              onJoin={() => {
                handleJoinChat(name, identity);
                setIsModalOpen(false);
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
