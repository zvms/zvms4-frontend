import type { User, UserPosition } from "@zvms/zvms4-types";
import api from "@/api";

export async function getUserPositions(user: User) {
  const result = await Promise.all(user.group.map(gid => api.group.readOne(gid)))
  const positions = result.map(group => group?.permissions).flat(Infinity)
  return positions as UserPosition[]
}
