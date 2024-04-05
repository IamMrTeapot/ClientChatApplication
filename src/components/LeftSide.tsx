import { useSelector } from "react-redux";
import { AppRootState } from "../redux/store";
import Dropdown from "./Dropdown";
import { IDropdownItem } from "./DropdownItem";

export default function LeftSide() {
  const { users: userList, groups: groupList } = useSelector(
    (state: AppRootState) => state.availableSlice
  );

  const { users: allPrivateMessages, groups: allGroupMessages } = useSelector(
    (state: AppRootState) => state.chatSlice
  );

  const joinedPrivateChatKeys = Object.keys(allPrivateMessages);
  const joinedGroupChatKeys = Object.keys(allGroupMessages);

  const joinedPrivateChatList = joinedPrivateChatKeys.map(
    (key): IDropdownItem => {
      return {
        name: allPrivateMessages[key].nickname,
        identity: key,
        hasModal: false,
      };
    }
  );

  const joinedGroupChatList = joinedGroupChatKeys.map((key): IDropdownItem => {
    return {
      name: key,
      identity: key,
      hasModal: false,
    };
  });

  return (
    <div
      className="bg-[#E7E7E7] h-full flex flex-col overflow-auto 
      scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-[#E7E7E7]
      "
    >
      <Dropdown type={"PRIVATE_CHAT"} dropdownList={joinedPrivateChatList} />
      <Dropdown type={"GROUP_CHAT"} dropdownList={joinedGroupChatList} />
      <Dropdown type={"ALL_USERS"} dropdownList={userList} />
      <Dropdown type={"ALL_GROUPS"} dropdownList={groupList} />
    </div>
  );
}
