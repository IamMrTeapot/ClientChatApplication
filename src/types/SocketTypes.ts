export const socketEmitChannel = {
  JOIN: "join",
  JOIN_GROUP: "join-group",
  JOIN_PRIVATE: "join-private",
  SEND_GROUP_MESSAGE: "send-group-message",
};

export const socketOnChannel = {
  AVAILABLE: "available",
  ERROR: "error",
  UNIQUE_GROUP: (groupIdentity: string) => `group-${groupIdentity}`,
};

export type availableResponse = {
  users: string[];
  groups: string[];
};

export type uniqueGroupResponse = {
  chatName: string;
  from: string;
  message: string;
  time: string;
};
