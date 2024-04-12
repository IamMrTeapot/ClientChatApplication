import { useSelector } from "react-redux";
import { AppRootState } from "../redux/store";
import Dropdown from "./Dropdown";
import { IDropdownItem } from "./DropdownItem";
import { formatUtils } from "../utils/formatUtils";

export default function LeftSide() {
  const username = useSelector((state: AppRootState) => state.userSlice.user) || "";
  const { users: userList, groups: groupList } = useSelector(
    (state: AppRootState) => state.availableSlice
  );

  const { users: allPrivateMessages, groups: allGroupMessages } = useSelector(
    (state: AppRootState) => state.chatSlice
  );
  // // For Testing only .... 
  // console.log("groups messsage",allGroupMessages);
  // console.log("private message",allPrivateMessages);
  // // 

  const joinedPrivateChatKeys = Object.keys(allPrivateMessages);
  const joinedGroupChatKeys = Object.keys(allGroupMessages);

  const joinedPrivateChatList = joinedPrivateChatKeys
    .filter((key) => key.split("-").includes(username))
    .map(
    (key): IDropdownItem => {
      return {
        name: formatUtils.getTargetUsername(allPrivateMessages[key].nickname,username),
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
      <Dropdown type={"ALL_USERS"} dropdownList={userList.filter((user) => user.identity !== username)} />
      <Dropdown type={"ALL_GROUPS"} dropdownList={groupList} />
    </div>
  );
}
