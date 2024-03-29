import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import JoinChatDropDown from "./JoinChatDropdown";
import { useState } from "react";

const focusClasses = "bg-white text-black border-2 border-black";
const blurClasses = "bg-[#9a979f] text-white";

export default function DropdownItem({
  name,
  isFocus,
  identity,
  hasModal,
}: {
  name: string;
  isFocus: boolean;
  identity: string;
  hasModal: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinChat = (identity: string) => {
    //TODO: implement joining chat
    alert(`Joining chat with ${identity}`);
  };

  return (
    <div
      className={`w-[95%] h-[40px] rounded-md 
    flex items-center ps-4 pe-2 justify-between cursor-pointer box-border
    ${isFocus ? focusClasses : blurClasses}`}
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
                handleJoinChat(identity);
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
