import Dropdown from "./Dropdown";
import { IDropdownItem } from "./DropdownItem";

const mockPrivateChatList: IDropdownItem[] = [
  { name: "User 1", identity: "user1", hasModal: false },
  { name: "User 2", identity: "user2", hasModal: false },
  { name: "User 3", identity: "user3", hasModal: false },
];

const mockGroupChatList: IDropdownItem[] = [
  { name: "Group 1", identity: "group1", hasModal: false },
  { name: "Group 2", identity: "group2", hasModal: false },
];

const mockAllUsersList: IDropdownItem[] = [
  { name: "User 1", identity: "user1", hasModal: true },
  { name: "User 2", identity: "user2", hasModal: true },
  { name: "User 3", identity: "user3", hasModal: true },
];

const mockAllGroupsList: IDropdownItem[] = [
  { name: "Group 1", identity: "group1", hasModal: true },
];

export default function LeftSide() {
  //TODO: You can't focus all_users and all_groups at all

  return (
    <div
      className="bg-[#E7E7E7] h-full flex flex-col overflow-auto 
      scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-[#E7E7E7]
      "
    >
      <Dropdown type={"PRIVATE_CHAT"} dropdownList={mockPrivateChatList} />
      <Dropdown type={"GROUP_CHAT"} dropdownList={mockGroupChatList} />
      <Dropdown type={"ALL_USERS"} dropdownList={mockAllUsersList} />
      <Dropdown type={"ALL_GROUPS"} dropdownList={mockAllGroupsList} />
    </div>
  );
}
