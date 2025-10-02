import { Routes, Route } from "react-router-dom"
import UserList from "./pages/UserList"
import UserDetails from "./pages/UserDetails"
import Layout from "./components/Layout"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Layout>
  )
}

export default App
