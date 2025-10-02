"use client"

import { useParams, Link } from "react-router-dom"
import { useUserDetails } from "../hooks/useUserDetails"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2 } from "lucide-react"

export default function UserDetails() {
  const { id } = useParams<{ id: string }>()
  const { user, isLoading, error, isLocalUser } = useUserDetails(id!)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">Loading user details...</div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="space-y-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-destructive">User not found.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        {isLocalUser && (
          <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">Local User</span>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <p className="text-muted-foreground">@{user.username}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${user.phone}`} className="hover:text-primary">
                      {user.phone}
                    </a>
                  </div>
                </div>
              )}

              {user.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address</h3>

              {user.address.street || user.address.city ? (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>
                      {user.address.street && `${user.address.street}, `}
                      {user.address.suite && `${user.address.suite}, `}
                    </p>
                    <p>
                      {user.address.city && `${user.address.city}, `}
                      {user.address.zipcode}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No address information</p>
              )}
            </div>
          </div>

          {user.company.name && (
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{user.company.name}</p>
                  {user.company.catchPhrase && (
                    <p className="text-sm text-muted-foreground italic">{user.company.catchPhrase}</p>
                  )}
                  {user.company.bs && <p className="text-sm text-muted-foreground">{user.company.bs}</p>}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
