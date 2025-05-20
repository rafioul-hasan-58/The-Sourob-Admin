export interface IProject {
  _id: string;
  title: string;
  description: string;
  images: string[];
  github_link_client: string;
  github_link_server: string;
  live_link: string;
  isDeleted: boolean;
  createdAt: string; // or Date, depending on how you parse/use it
  updatedAt: string; // or Date
  __v: number;
}
