import axios from "@/plugins/axios";

export async function deleteActivity(id: string) {
  const result = (
    await axios(`/activity/${id}`, {
      method: "delete",
    })
  ).data;
  return result;
}
