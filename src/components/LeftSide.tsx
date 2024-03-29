import Dropdown from "./Dropdown";

export default function LeftSide() {
  return (
    <div className="bg-[#E7E7E7] h-full flex flex-col">
      <Dropdown type={"PRIVATE_CHAT"} />
      <Dropdown type={"ALL_GROUPS"} />
    </div>
  );
}
