import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { useDispatch, useSelector } from "react-redux";
import { connection } from "../redux/features/userSlice";
import { AppRootState } from "../redux/store";
import { mySocket } from "../config/socketClient";
import { socketEmitChannel } from "../types/SocketTypes";

export default function UsernameModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const username = useSelector((state: AppRootState) => state.userSlice.user);
  const dispatch = useDispatch();
  const [inputUsername, setInputUsername] = useState<string>(username || "");

  const handleClose = () => {
    if (username === "") {
      alert("Please enter a username");
      return;
    }
    onClose();
  };

  const handleConfirm = () => {
    if (inputUsername === "") {
      alert("Please enter a username");
      return;
    }
    dispatch(connection(inputUsername));
    mySocket.emit(socketEmitChannel.JOIN, inputUsername);
    onClose();
  };

  return (
    <ModalOverlay isVisible={isVisible} onClose={handleClose}>
      <div className="bg-[#E7E7E7] w-[40vw] p-4 flex flex-col items-center rounded-md">
        <h1 className="text-xl font-semibold uppercase mt-4">Hi There !</h1>
        <h1 className="text-xl font-semibold uppercase">Type your username</h1>
        <input
          type="text"
          className="border p-2 w-[80%] mt-4"
          placeholder="Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <div className="w-[80%] flex justify-end mt-4 mb-2">
          <button
            className="bg-[#519D74] rounded-md text-white text-xs py-2 px-4 mt-2"
            onClick={handleConfirm}
          >
            join our server now !
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
