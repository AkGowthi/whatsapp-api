import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "@/pages/Dashboard"
import Chats from "@/pages/Chats"
import Templates from "@/pages/Templates"
import AddTemplate from "@/pages/AddTemplate"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/chats" element={<Chats />} />
  <Route path="/templates" element={<Templates />} />
  <Route path="/add-template" element={<AddTemplate />} />
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
