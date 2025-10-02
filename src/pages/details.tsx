import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone?: string;
  website?: string;
  address?: string;
};

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localUsers: User[] = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const foundLocal = localUsers.find(u => u.id === Number(id));
    if (foundLocal) {
      setUser(foundLocal);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const apiUser: User = await res.json();
        setUser(apiUser);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Website:</strong> {user.website || "N/A"}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
      </CardContent>
    </Card>
  );
}
