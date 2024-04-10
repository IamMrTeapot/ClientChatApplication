import { useEffect, useState } from "react";
import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import UsernameModal from "./components/UsernameModal";
import { mySocket } from "./config/socketClient";
import {
  availableResponse,
  socketOnChannel,
  uniqueGroupResponse,
} from "./types/SocketTypes";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableList } from "./redux/features/availableSlice";
import { AppRootState } from "./redux/store";
import { formatUtils } from "./utils/formatUtils";
import { updateGroupChat, updatePrivateChat } from "./redux/features/chatSlice";

function App() {
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [isEditModal, setIsEditModal] = useState(false);
  const { users, groups } = useSelector(
    (state: AppRootState) => state.chatSlice
  );
  const username = useSelector((state: AppRootState) => state.userSlice.user);
  const userKeys = Object.keys(users);
  const groupKeys = Object.keys(groups);

  const dispatch = useDispatch();
  console.log("userKeys",userKeys);
  console.log("groupKeys",groupKeys);
  useEffect(() => {
    mySocket.on(socketOnChannel.ERROR, (message: string) => {
      alert(message);
    });

    return () => {
      mySocket.off(socketOnChannel.ERROR);
    };
  }, []);

  useEffect(() => {
    const handleAvailableResponse = (response: availableResponse) => {
      console.log("YES");
      dispatch(
        setAvailableList({
          users: response.users.map((user) => ({
            name: user,
            identity: user,
            hasModal: true,
          })),
          groups: response.groups
            .filter((group ) => (Boolean(group[0]) === true))
            .map((group) => ({
              name: group[1],
              identity: group[1],
              hasModal: true,
          })),
          privateChats : response.groups
            .filter((group ) => (Boolean(group[0]) === false))
            .map((group) => ({
              name: group[1],
              identity: group[1],
              hasModal: true,
          })),
        })
      );
    };

    mySocket.on(socketOnChannel.AVAILABLE, handleAvailableResponse);

    return () => {
      mySocket.off(socketOnChannel.AVAILABLE, handleAvailableResponse);
    };

  }, []);

  useEffect(() => {
    const handleGroupResponse = (response: uniqueGroupResponse) => {
      dispatch(
        updateGroupChat({
          identity: response.chatName,
          message: {
            text: response.message,
            isSender: response.from === username,
            time: formatUtils.formatStringTime(response.time),
            name: response.from,
          },
        })
      );
    };
    const handlePrivateChatResponse = (response: uniqueGroupResponse) => {
      dispatch(
        updatePrivateChat({
          identity: response.chatName,
          message: {
            text: response.message,
            isSender: response.from === username,
            time: formatUtils.formatStringTime(response.time),
            name: response.from,
          },
        })
      );
    };


    const handleJoinGroupChat = (identity: string) => {
      console.log("joining ", socketOnChannel.UNIQUE_GROUP(identity));
      mySocket.on(socketOnChannel.UNIQUE_GROUP(identity), handleGroupResponse);
      console.log("Finished joining group chat!");
    };

    const handleJoinPrivateChat = (targetUsername : string) => {
      console.log("joining ", socketOnChannel.UNIQUE_PRIVATE(username || "",targetUsername));
      mySocket.on(socketOnChannel.UNIQUE_PRIVATE(username || "",targetUsername), handlePrivateChatResponse);
      console.log(`Finished joining private chat with ${targetUsername}!`);
    };

    userKeys.forEach((targetUsername) => {
      handleJoinPrivateChat(targetUsername);
    });
    groupKeys.forEach((group) => {
      handleJoinGroupChat(group);
    });

    return () => {
      userKeys.forEach((user) => {
        mySocket.off(socketOnChannel.UNIQUE_PRIVATE(username || "",user) , handlePrivateChatResponse);
      });
      groupKeys.forEach((group) => {
        mySocket.off(socketOnChannel.UNIQUE_GROUP(group), handleGroupResponse);
      });
    };
  }, [userKeys, groupKeys]);

  return (
    <main className="w-full h-screen overflow-y-hidden font-prompt">
      <Header
        onEdit={() => {
          setIsEditModal(true);
          setShowUsernameModal(true);
        }}
      />
      <div className="flex bg-gray-400 h-full pt-[50px]">
        <div className="w-1/4 h-full">
          <LeftSide />
        </div>
        <div className="w-3/4 h-full">
          <RightSide />
        </div>
      </div>
      <UsernameModal
        isVisible={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        isEditModal={isEditModal}
      />
    </main>
  );
}

export default App;
