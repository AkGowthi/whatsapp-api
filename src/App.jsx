import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import Chats from "@/pages/Chats"
import Templates from "@/pages/Templates"
import AddTemplate from "@/pages/add_template/AddTemplate"
import TemplateLibrary from "./pages/add_template/TemplateLibrary"  
import Campaigns from "@/pages/campaigns/Campaigns"
import CampaignCalendar from "@/pages/campaigns/CampaignCalendar"
import CreateCampaign from "@/pages/campaigns/CreateCampaign"
import AllContacts from "@/pages/contacts/AllContacts"
import ContactGroups from "@/pages/contacts/ContactGroups"
import ContactAttributes from "@/pages/contacts/ContactAttributes"
import ImportContacts from "@/pages/contacts/ImportContacts"
import Wallet from "@/pages/Wallet"
import Account from "@/pages/Account"

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/add-template" element={<AddTemplate />} />
      <Route path="/template-library" element={<TemplateLibrary />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaign-calendar" element={<CampaignCalendar />} />
      <Route path="/create-campaign" element={<CreateCampaign />} />
      <Route path="/all-contacts" element={<AllContacts />} />
      <Route path="/contact-groups" element={<ContactGroups />} />
      <Route path="/contact-attributes" element={<ContactAttributes />} />
      <Route path="/import-contacts" element={<ImportContacts />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
  )
}
