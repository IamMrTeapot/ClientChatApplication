export interface IMessage {
  text: string;
  isSender: boolean;
  name?: string;
  image?: File;
}

export default function Message({ text, isSender, name, image }: IMessage) {
  return (
    <div className={`w-full flex px-4 ${isSender ? "justify-end" : ""}`}>
      <div>
        {!isSender && <div>{name}</div>}
        <div
          className={`py-3 px-4 rounded-md ${
            isSender ? "bg-[#E7E7E7]" : "bg-[#FFD523]"
          }  text-[#3B3B3B] w-fit`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
