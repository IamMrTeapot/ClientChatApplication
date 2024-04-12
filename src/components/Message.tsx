export interface IMessage {
  text: string;
  isSender: boolean;
  isText : boolean;
  name?: string;
  image?: File;
  time?: string;
}

export default function Message({
  text,
  isSender,
  isText,
  name,
  image,
  time,
}: IMessage) {
  return  (isText ? (
    <div className={`w-full flex px-4 ${isSender ? "justify-end" : ""}`}>
      <div>
        {!isSender && <div className="text-white">{name}</div>}
        <div
          className={`flex items-end gap-3 ${
            isSender ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`py-3 px-4 rounded-md ${
              isSender ? "bg-[#E7E7E7]" : "bg-[#FFD523]"
            }  text-[#3B3B3B] w-fit`}
          >
            {text}
          </div>
          <p className="text-sm">{time}</p>
        </div>
      </div>
    </div>
  ) 
  :
  (
    <div className={`w-full flex px-4 ${isSender ? "justify-end" : ""}`}>
      <div>
        {!isSender && <div className="text-white">{name}</div>}
        <div
          className={`flex items-end gap-3 ${
            isSender ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`py-3 px-4 rounded-md ${
              isSender ? "bg-[#E7E7E7]" : "bg-[#FFD523]"
            }  text-[#3B3B3B] w-fit`}
          >
            <img src={text} className="object-contain md:object-scale-down h-auto max-w-xs"></img> 
          </div>
          <p className="text-sm">{time}</p>
        </div>
      </div>
    </div>
  )
) ;
}
