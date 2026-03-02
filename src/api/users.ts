import { api } from "./client";
import { User, UserFormRequest, UsersPage } from "../types/user";

export const getAllUsers = async (page = 0, size = 10): Promise<UsersPage> =>
  (
    await api.get<UsersPage>("/users/all", {
      params: { page, size, sort: "userId,asc" },
    })
  ).data;

export const getUserById = async (id: number): Promise<User> =>
  (await api.get<User>(`/users/${id}`)).data;

export const createUser = async (body: UserFormRequest): Promise<string> =>
  (await api.post<string>("/users/save", body, { responseType: "text" })).data;

export const updateUser = async (
  id: number,
  body: UserFormRequest,
): Promise<string> =>
  (await api.put<string>(`/users/${id}`, body, { responseType: "text" })).data;

export const blockUser = async (id: number): Promise<string> =>
  (
    await api.patch<string>(`/users/${id}/block`, null, {
      responseType: "text",
    })
  ).data;

export const unblockUser = async (id: number): Promise<string> =>
  (
    await api.patch<string>(`/users/${id}/unblock`, null, {
      responseType: "text",
    })
  ).data;
