
import imgDefault from "../assets/image6.png";
import { IImage } from "../types";

export function getImageUrl(image: IImage): string {
    if (image && image.data) {
      return `data:${image.type || 'image/png'};base64,${image.data}`;
    }
    return imgDefault;
  }
  