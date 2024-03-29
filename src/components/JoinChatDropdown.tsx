export default function JoinChatDropDown({
  isGroup,
  onJoin,
  onCancel,
}: {
  isGroup: boolean;
  onJoin: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="flex flex-col gap-1 bg-[#e1e1e1] w-[150px] p-2 
    items-center text-sm rounded-xl absolute top-5 right-0 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={onJoin}>
        {isGroup ? "join this group" : "talk to this user"}
      </div>
      <div className="h-[1px] w-[90%] bg-white" />
      <div onClick={onCancel}>cancel</div>
    </div>
  );
}
