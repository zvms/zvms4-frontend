import axios from "axios";
import type { UploadFile } from "element-plus";
import type { Response } from "@zvms/zvms4-types";

export function put(file: UploadFile) {
  return new Promise<string>((resolve, reject) => {
    if (!file.raw) {
      reject(new Error("File is not an image"));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = () => {
      axios
        .put("/image", { data: reader.result })
        .then((res) => {
          const result = res.data as Response<string>;
          if (result.status === "ok") {
            resolve(result.data);
          } else {
            reject(new Error(result.message));
          }
        })
        .catch((err) => reject(err));
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function get(id: string) {
  const result = (await axios(`/image/${id}`)).data as Response<string>
  if (result.status === 'ok') {
    return result.data
  }
  return ''
}
