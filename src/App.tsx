import UsersTable from "./api/users";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">User Management App</h1>
      <UsersTable />
    </div>
  );
}

export default App;
