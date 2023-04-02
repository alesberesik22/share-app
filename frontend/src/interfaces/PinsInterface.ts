export interface IPins {
  _id: string;
  url?: string;
  image: Image;
  postedBy: PostedBy;
  save: any[];
}
export interface Image {
  asset: Asset;
}
export interface Asset {
  url: string;
}
export interface PostedBy {
  _id: string;
  image: string;
  userName: string;
}
