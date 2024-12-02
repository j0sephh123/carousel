// Currently only using download_url, but keeping them in case we need other stuff
export type RawImageData = {
  id: string;
  download_url: string;
  height: number;
  author: string;
  url: string;
  width: number;
};

export type Config = {
  imagesLimit: number;
  pageSize: number;
};
