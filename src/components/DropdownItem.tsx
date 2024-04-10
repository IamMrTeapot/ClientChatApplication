import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import JoinChatDropDown from "./JoinChatDropdown";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../redux/store";
import { selectChat } from "../redux/features/userSlice";
import { mySocket } from "../config/socketClient";
import { socketEmitChannel } from "../types/SocketTypes";
import { DropdownType } from "./Dropdown";
import { updateGroupChat, updatePrivateChat } from "../redux/features/chatSlice";
import { formatUtils } from "../utils/formatUtils";

const focusClasses = "bg-white text-black border-2 border-black";
const blurClasses = "bg-[#9a979f] text-white";

export interface IDropdownItem {
  name: string;
  identity: string;
  hasModal: boolean;
}

interface IDropdownItemProps extends IDropdownItem {
  type: DropdownType;
}

export default function DropdownItem({
  name,
  identity,
  hasModal,
  type,
}: IDropdownItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedChatIdentity } = useSelector(
    (state: AppRootState) => state.userSlice
  );
  const username = useSelector((state: AppRootState) => state.userSlice.user);
  const isFocus = selectedChatIdentity === identity;
  const isGroup = type === "ALL_GROUPS" || type === "GROUP_CHAT";

  const handleJoinChat = useCallback((identity: string, isGroup: boolean) => {
    //TODO: implement joining private chat
    if (isGroup) {
      dispatch(updateGroupChat({ identity, message: null }));
      mySocket.emit(socketEmitChannel.JOIN_GROUP, identity);
    } else {
      dispatch(updatePrivateChat({ identity, message : null}));
      mySocket.emit(socketEmitChannel.JOIN_PRIVATE, formatUtils.getTargetUsername(identity,username || ""));
    }
  }, []);

  const handleSelectChat = (
    name: string,
    identity: string,
    isGroup: boolean
  ) => {
    if (hasModal) return;
    dispatch(selectChat({ name, identity, isGroup }));
  };

  return (
    <div
      className={`w-[95%] h-[40px] rounded-md 
    flex items-center ps-4 pe-2 justify-between cursor-pointer box-border
    ${isFocus && !hasModal ? focusClasses : blurClasses}`}
      onClick={() => handleSelectChat(name, identity, isGroup)}
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
              isGroup={isGroup}
              onJoin={() => {
                if(!isGroup ){
                  if(username) handleJoinChat(formatUtils.hashPrivateChatName(identity,username),isGroup)
                }else{
                  handleJoinChat(identity, isGroup);
                }
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
