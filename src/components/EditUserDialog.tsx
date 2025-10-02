"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppDispatch, updateUser } from "../store/store"
import type { User } from "../../types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface EditUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditUserDialog({ user, open, onOpenChange }: EditUserDialogProps) {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>()

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  const onSubmit = (data: User) => {
    dispatch(updateUser(data))
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name *</Label>
            <Input id="edit-name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email *</Label>
            <Input
              id="edit-email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-username">Username</Label>
            <Input id="edit-username" {...register("username")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input id="edit-phone" {...register("phone")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-website">Website</Label>
            <Input id="edit-website" {...register("website")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-company">Company</Label>
            <Input id="edit-company" {...register("company.name")} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update User</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
