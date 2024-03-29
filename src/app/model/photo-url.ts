import {Photo} from "../API.service";
import {Progress} from "./progress";

export type PhotoUrl = {
  photo: Photo
  url: string
  progress?: Progress
  file?: File
  image?: HTMLImageElement
  loading?: boolean
}
