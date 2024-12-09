import { ImageSource } from "./context/apiMapper";

// this is important to determine when last page is reached and we shoudl loop
export const IMAGES_LIMIT = 50;
// not related to the UI but used in fetchers to determine how many images to fetch per request
export const PAGE_SIZE = 15;
// also important for the ui as it is confurable
export const DEFAULT_ITEMS_PER_VIEW = 4;
// not really sure what to do with this one, not configurable but used in 2 places
export const GAP = 10;

export const DEFAULT_IMAGE_SOURCE: ImageSource = "picsum";
