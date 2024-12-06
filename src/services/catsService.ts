import { PAGE_SIZE } from "../constants";

const catImageFetcher = async <T>(page: number) => {
  const response = await fetch(
    `https://cataas.com/api/cats?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`
  );
  return response.json() as T;
};

export const fetchCatImages = async (page: number) => {
  const data = await catImageFetcher<{ _id: string }[]>(page);

  return data.map((item) => `https://cataas.com/cat/${item._id}`);
};
