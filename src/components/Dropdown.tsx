import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import DropdownItem, { IDropdownItem } from "./DropdownItem";
import { FaPlus } from "react-icons/fa6";
import CreateGroupChatModal from "./CreateGroupChatModal";

export type DropdownType =
  | "PRIVATE_CHAT"
  | "GROUP_CHAT"
  | "ALL_USERS"
  | "ALL_GROUPS";

const titleMapper: Record<DropdownType, string> = {
  PRIVATE_CHAT: "# private chat",
  GROUP_CHAT: "# joined groups",
  ALL_USERS: "# all users",
  ALL_GROUPS: "# all groups",
};

export default function Dropdown({
  type,
  dropdownList,
}: {
  type: DropdownType;
  dropdownList: IDropdownItem[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-2">
      <div className="w-full bg-[#FFD523] h-[40px] flex items-center px-3 font-semibold justify-between">
        <p>{titleMapper[type]}</p>
        <div className="flex gap-2 items-center">
          <div
            className="flex cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? (
              <MdKeyboardArrowUp size={30} />
            ) : (
              <MdKeyboardArrowDown size={30} />
            )}
          </div>
          {type === "ALL_GROUPS" && (
            <div className="cursor-pointer" onClick={handleCreateGroup}>
              <FaPlus size={18} />
            </div>
          )}
        </div>
      </div>
      {isDropdownOpen &&
        dropdownList.map((item) => (
          <DropdownItem {...item} type={type} key={item.identity} />
        ))}
      {type === "ALL_GROUPS" && showCreateGroupModal && (
        <CreateGroupChatModal
          isVisible={showCreateGroupModal}
          onClose={() => setShowCreateGroupModal(false)}
        />
      )}
    </div>
  );
}
