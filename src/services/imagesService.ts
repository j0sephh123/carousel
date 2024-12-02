import { RawImageData } from "../types/globalTypes";

const imageFetcher = async <T>(page: number, limit: number) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );
  return response.json() as T;
};

export const fetchImages = async (page: number, perPage: number) => {
  const data = await imageFetcher<RawImageData[]>(page, perPage);
  const imageUrls = data.map((item) => item.download_url);

  return imageUrls;
};
