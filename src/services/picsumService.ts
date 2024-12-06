import { PAGE_SIZE } from "../constants";
import { RawImageData } from "../types/globalTypes";

const imageFetcher = async <T>(page: number) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`
  );
  return response.json() as T;
};

export const fetchPicsumImages = async (page: number) => {
  const data = await imageFetcher<RawImageData[]>(page);

  return data.map((item) => item.download_url);
};
