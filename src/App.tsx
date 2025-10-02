import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersTable from "./pages/users";
import Details from "./pages/details";


function App() {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management App</h1>
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/user/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

