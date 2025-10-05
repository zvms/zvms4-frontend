import { UserPosition } from "./user";

export interface Group {
  _id: string; // ObjectId
  name: string;
  type: "class" | "permission" | "group";
  description?: string;
  permissions: UserPosition[];
}
