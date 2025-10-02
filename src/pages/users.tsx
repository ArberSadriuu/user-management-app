import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../components/addUser";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone?: string;
  website?: string;
  address?: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const apiUsers: User[] = await response.json();
        const localUsers: User[] = JSON.parse(localStorage.getItem("localUsers") || "[]");
        setUsers([...localUsers, ...apiUsers]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p className="text-center text-gray-600">Loading users</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <AddUserForm setUsers={setUsers} />
      <Input type="text" placeholder="Search bar" value={search} onChange={e => setSearch(e.target.value)} className="mb-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, idx) => (
            <TableRow key={idx} className="cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/user/${user.id}`)}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
