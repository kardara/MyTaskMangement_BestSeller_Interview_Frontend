import { useState, useEffect, useCallback } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  blockUser,
  unblockUser,
} from "../api/users";
import { User, UsersPage, UserFormRequest } from "../types/user";
import { parseBackendError } from "../api/client";

export function useUsers(pageSize = 10) {
  const [page, setPageData] = useState<UsersPage | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPage = useCallback(
    async (p: number) => {
      setLoading(true);
      setError("");
      try {
        setPageData(await getAllUsers(p, pageSize));
      } catch (err) {
        setError(parseBackendError(err, "Failed to load users"));
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    fetchPage(currentPage);
  }, [fetchPage, currentPage]);

  const add = async (body: UserFormRequest) => {
    await createUser(body);
    fetchPage(currentPage);
  };

  const update = async (id: number, body: UserFormRequest) => {
    await updateUser(id, body);
    fetchPage(currentPage);
  };

  const toggleBlock = async (user: User) => {
    setError("");
    try {
      if (!user.deleted) {
        await blockUser(user.userId);
      } else {
        await unblockUser(user.userId);
      }
      await fetchPage(currentPage);
    } catch (err) {
      setError(parseBackendError(err, "Failed to update user status"));
    }
  };

  return {
    page,
    loading,
    error,
    currentPage,
    setCurrentPage,
    add,
    update,
    toggleBlock,
  };
}
