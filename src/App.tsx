import { useState } from "react";
import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import UsernameModal from "./components/UsernameModal";

function App() {
  const [showUsernameModal, setShowUsernameModal] = useState(true);

  return (
    <main className="w-full h-screen overflow-y-hidden font-prompt">
      <Header onEdit={() => setShowUsernameModal(true)} />
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
      />
    </main>
  );
}

export default App;
