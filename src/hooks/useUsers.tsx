import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../api/users"
import { useAppSelector } from "../store/hooks"
import type { User } from "@/"

export const useUsers = () => {
  const localUsers = useAppSelector((state) => state.users.localUsers)

  const {
    data: apiUsers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const allUsers: User[] = [...localUsers, ...apiUsers]

  return {
    users: allUsers,
    isLoading,
    error,
  }
}
