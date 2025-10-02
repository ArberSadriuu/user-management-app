"use client"

import { Link } from "react-router-dom"
import type { User } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Mail, Building2, Trash2, Edit } from "lucide-react"

interface UserCardProps {
  user: User
  onDelete?: (id: number) => void
  onEdit?: (user: User) => void
  isLocalUser?: boolean
}

export default function UserCard({ user, onDelete, onEdit, isLocalUser }: UserCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link to={`/user/${user.id}`} className="hover:text-primary transition-colors">
            {user.name}
          </Link>
          {isLocalUser && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit?.(user)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete?.(user.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{user.company.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}
