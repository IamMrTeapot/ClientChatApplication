import { formatUtils } from "../utils/formatUtils";

export const socketEmitChannel = {
  JOIN: "join",
  JOIN_GROUP: "join-group",
  JOIN_PRIVATE: "join-private",
  SEND_GROUP_MESSAGE: "send-group-message",
  SEND_PRIVATE_MESSAGE : "send-private-message"
};

export const socketOnChannel = {
  AVAILABLE: "available",
  ERROR: "error",
  UNIQUE_GROUP: (groupIdentity: string) => `group-${groupIdentity}`,
  UNIQUE_PRIVATE : (myUsername : string ,targetUsername : string ) => `private-${formatUtils.hashPrivateChatName(myUsername,targetUsername)}`,
};

export type availableResponse = {
  users: string[];
  groups: string[];
  privateChats : string[];
};

export type uniqueGroupResponse = {
  chatName: string;
  from: string;
  message: string;
  time: string;
};
