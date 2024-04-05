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
import { updateGroupChat } from "./redux/features/chatSlice";

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
          groups: response.groups.map((group) => ({
            name: group,
            identity: group,
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
          },
        })
      );
    };

    const handleJoinGroupChat = (identity: string) => {
      console.log("joining ", socketOnChannel.UNIQUE_GROUP(identity));
      mySocket.on(socketOnChannel.UNIQUE_GROUP(identity), handleGroupResponse);
      console.log("Finished joining group chat!");
    };

    const handleJoinPrivateChat = () => {
      console.log("Private Chat Joining is not implemented yet!");
    };

    userKeys.forEach(() => {
      handleJoinPrivateChat();
    });
    groupKeys.forEach((group) => {
      handleJoinGroupChat(group);
    });

    return () => {
      userKeys.forEach(() => {
        //mySocket.off(socketOnChannel.UNIQUE_GROUP(user));
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
