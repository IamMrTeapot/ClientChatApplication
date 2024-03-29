import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

function App() {
  return (
    <main className="w-full h-screen overflow-y-hidden font-prompt">
      <Header />
      <div className="flex bg-gray-400 h-full pt-[50px]">
        <div className="w-1/4 h-full">
          <LeftSide />
        </div>
        <div className="w-3/4 h-full">
          <RightSide />
        </div>
      </div>
    </main>
  );
}

export default App;
