import { Author } from "./author";
import { Genre } from "./genre";
import { PublishingHouse } from "./publishing-house";

export interface Book {
  id: string;
  title: string;
  publishingYear: number;
  publishingHouseDto: PublishingHouse;
  authorDtoList: Author[];
  genreDtoList: Genre[];
  price: number;
}
