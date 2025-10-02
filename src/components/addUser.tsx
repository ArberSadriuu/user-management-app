import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone?: string;
  website?: string;
  address?: string;
};

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

type FormData = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
  address?: string;
};

export default function AddUserForm({ setUsers }: Props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const localUsers: User[] = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const newUser: User = {
      id: localUsers.length ? localUsers[localUsers.length - 1].id + 1 : 1000,
      name: data.name,
      email: data.email,
      company: { name: data.company || "N/A" },
      phone: data.phone || "",
      website: data.website || "",
      address: data.address || ""
    };
    const updatedUsers = [...localUsers, newUser];
    localStorage.setItem("localUsers", JSON.stringify(updatedUsers));
    setUsers(prev => [newUser, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="mb-6">
      {!open && <Button onClick={() => setOpen(true)}>Add User</Button>}
      {open && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-2">
          <Input placeholder="Name (required)" {...register("name", { required: true })} />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

          <Input placeholder="Email (required)" {...register("email", { required: true })} />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

          <Input placeholder="Company" {...register("company")} />
          <Input placeholder="Website" {...register("website")} />
          <Input placeholder="Phone" {...register("phone")} />
          <Input placeholder="Address" {...register("address")} />

          <Button type="submit" className="mt-2 w-32">Add User</Button>
        </form>
      )}
    </div>
  );
}
