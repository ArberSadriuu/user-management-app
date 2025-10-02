"use client"

import { useState, useMemo } from "react"
import { useUsers } from "../hooks/useUsers"
import { useAppDispatch, useAppSelector, deleteUser } from "../store/store"
import type { User } from "../../types"
import UserCard from "../components/UserCard"
import UserTable from "../components/UserTable"
import AddUserDialog from "../components/AddUserDialog"
import EditUserDialog from "../components/EditUserDialog"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Search, Grid, List, ArrowUpDown } from "lucide-react"

type ViewMode = "grid" | "table"
type SortField = "name" | "email" | "company"
type SortOrder = "asc" | "desc"

export default function UserList() {
  const { users, isLoading, error } = useUsers()
  const dispatch = useAppDispatch()
  const localUserIds = useAppSelector((state) => state.users.localUsers.map((u) => u.id))

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const query = searchQuery.toLowerCase()
      return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    })

    const localUsers = filtered.filter((user) => localUserIds.includes(user.id))
    const apiUsers = filtered.filter((user) => !localUserIds.includes(user.id))

    const sortUsers = (usersToSort: User[]) => {
      return usersToSort.sort((a, b) => {
        let aValue: string
        let bValue: string

        if (sortField === "company") {
          aValue = a.company.name.toLowerCase()
          bValue = b.company.name.toLowerCase()
        } else {
          aValue = a[sortField].toLowerCase()
          bValue = b[sortField].toLowerCase()
        }

        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      })
    }

    // Sort each group independently
    const sortedLocalUsers = sortUsers([...localUsers])
    const sortedApiUsers = sortUsers([...apiUsers])

    // Return local users first (newest at top), then API users
    return [...sortedLocalUsers, ...sortedApiUsers]
  }, [users, searchQuery, sortField, sortOrder, localUserIds])

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditDialogOpen(true)
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-destructive">Error loading users. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <AddUserDialog />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedUsers.length} of {users.length} users
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isLocalUser={localUserIds.includes(user.id)}
            />
          ))}
        </div>
      ) : (
        <UserTable
          users={filteredAndSortedUsers}
          onDelete={handleDelete}
          onEdit={handleEdit}
          localUserIds={localUserIds}
        />
      )}

      <EditUserDialog user={editingUser} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </div>
  )
}
