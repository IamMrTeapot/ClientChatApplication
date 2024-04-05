import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppRootState } from "../redux/store";

export default function Header({ onEdit }: { onEdit: () => void }) {
  const username = useSelector((state: AppRootState) => state.userSlice.user);
  return (
    <div className="absolute w-full bg-[#2C2E43] h-[50px] flex justify-between py-3 ps-3 pe-6 text-white font-bold">
      <div>#34</div>
      <div className="flex justify-between items-center gap-4">
        <div className="text-xl">{username}</div>
        <FaPen className="cursor-pointer" onClick={onEdit} />
      </div>
    </div>
  );
}
