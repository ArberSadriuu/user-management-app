import { useQuery } from "@tanstack/react-query"
import { fetchUserById } from "../api/users"
import { useAppSelector } from "@/store/hooks"

export const useUserDetails = (id: string) => {
  const localUsers = useAppSelector((state) => state.users.localUsers)
  const localUser = localUsers.find((user) => user.id === Number(id))

  const {
    data: apiUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !localUser,
  })

  return {
    user: localUser || apiUser,
    isLoading: localUser ? false : isLoading,
    error,
    isLocalUser: !!localUser,
  }
}
