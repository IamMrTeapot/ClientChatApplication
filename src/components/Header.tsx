import { FaPen } from "react-icons/fa";

export default function Header() {
  return (
    <div className="absolute w-full bg-[#2C2E43] h-[50px] flex justify-between py-3 px-6 text-white">
      <div>#34</div>
      <div className="flex justify-between items-center gap-4">
        <div>Mock Username</div>
        <FaPen />
      </div>
    </div>
  );
}
