export interface IUser {
  email: string;
  role: string;
  exp: number;
  iat: number;
}
export type TUser = {
  _id: string;
  name: string;
  role: "admin"; // Since you mentioned only admin is allowed
  email: string;
  password: string;
  image: string;
  phone: string;
  createdAt: string; // Or `Date` if you parse it
  updatedAt: string; // Or `Date` if you parse it
  __v: number;
};
