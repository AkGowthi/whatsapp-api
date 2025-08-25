import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  Search,
  Eye,
} from "lucide-react";

// Helper to get unique key for each contact (could be name+phone for demo)
function getContactKey(contact) {
  return contact.name + "|" + contact.phone;
}
const contacts = [
  {
    name: "Gowtham",
    email: "",
    org: "nutz",
    phone: "+91 9698739898",
    groups: "",
    attributes: [
      { label: "name", value: "gowtham" },
      { label: "phone", value: "919698739898" },
      { label: "organization_name", value: "nutz" },
    ],
  },
  {
    name: "Mohan",
    email: "",
    org: "nutz",
    phone: "+91 8344647098",
    groups: "",
    attributes: [
      { label: "name", value: "mohan" },
      { label: "phone", value: "918344647098" },
      { label: "organization_name", value: "nutz" },
    ],
  },
  {
    name: "Rohith",
    email: "rohithpkongu@gmail.com",
    org: "nutz",
    phone: "+91 9080858146",
    groups: "",
    attributes: [
      { label: "name", value: "rohith" },
      { label: "phone", value: "919080858146" },
      { label: "email", value: "rohithpkongu@gmail.com" },
      { label: "organization_name", value: "nutz" },
    ],
  },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "org", label: "Organization Name" },
  { key: "phone", label: "Phone Number" },
  { key: "groups", label: "Groups" },
  { key: "attributes", label: "Attributes" },
];

export default function AllContacts() {
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    org: true,
    phone: true,
    groups: true,
    // attributes: true, // Remove attributes from table columns
  });
  // Selection state
  const [selected, setSelected] = useState([]);
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAttributes, setModalAttributes] = useState([]);
  const [modalContact, setModalContact] = useState(null);

  // Filtered contacts (if you want to support search)
  const filteredContacts = contacts.filter((c) => {
    const searchLower = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(searchLower) ||
      c.phone.toLowerCase().includes(searchLower) ||
      (c.email && c.email.toLowerCase().includes(searchLower)) ||
      (c.org && c.org.toLowerCase().includes(searchLower))
    );
  });

  // Select all handler
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelected(filteredContacts.map(getContactKey));
    } else {
      setSelected([]);
    }
  };

  // Row select handler
  const handleSelect = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Modal open handler
  const handleShowAttributes = (contact) => {
    setModalContact(contact);
    setModalAttributes(contact.attributes || []);
    setModalOpen(true);
  };

  const allChecked =
    filteredContacts.length > 0 &&
    filteredContacts.every((c) => selected.includes(getContactKey(c)));
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="flex flex-col w-full bg-gray-50 p-6">
          <h1 className="text-2xl font-bold mb-4">Contacts</h1>
          <div className="flex flex-row justify-between items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-80 rounded-lg bg-white border-gray-200 text-base"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 font-medium"
                  >
                    <SlidersHorizontal className="w-4 h-4" /> View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500">
                    Toggle columns
                  </div>
                  {columns.map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.key}
                      checked={visibleColumns[col.key]}
                      onCheckedChange={() =>
                        setVisibleColumns((v) => ({
                          ...v,
                          [col.key]: !v[col.key],
                        }))
                      }
                      className="capitalize"
                    >
                      {col.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="font-medium">
                Contact Groups
              </Button>
              <Button variant="outline" className="font-medium">
                Contact Attribute
              </Button>
              <Button variant="outline" className="font-medium">
                Import Contacts
              </Button>
              <Button className="bg-black text-white font-medium hover:bg-gray-800">
                Add Contact
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg border overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-gray-700 bg-gray-50 border-b rounded-t-lg">
                  <th className="px-3 py-2 w-10 rounded-tl-lg">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChecked;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  {visibleColumns.name && (
                    <th className="px-3 py-2">
                      Name <span className="align-middle">⇅</span>
                    </th>
                  )}
                  {visibleColumns.email && (
                    <th className="px-3 py-2">
                      Email <span className="align-middle">⇅</span>
                    </th>
                  )}
                  {visibleColumns.org && (
                    <th className="px-3 py-2">
                      Organization Name <span className="align-middle">⇅</span>
                    </th>
                  )}
                  {visibleColumns.phone && (
                    <th className="px-3 py-2">
                      Phone Number <span className="align-middle">⇅</span>
                    </th>
                  )}
                  {visibleColumns.groups && (
                    <th className="px-3 py-2">
                      Groups <span className="align-middle">⇅</span>
                    </th>
                  )}
                  <th className="px-3 py-2">Attributes</th>
                  <th className="px-3 py-2 w-8 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody className="text-[15px] text-gray-900 font-normal">
                {filteredContacts.map((c, i) => {
                  const key = getContactKey(c);
                  return (
                    <tr
                      key={key}
                      className="border-b last:border-0 hover:bg-gray-50 even-row-height"
                    >
                      <td className="px-3 py-2 align-middle">
                        <input
                          type="checkbox"
                          checked={selected.includes(key)}
                          onChange={() => handleSelect(key)}
                        />
                      </td>
                      {visibleColumns.name && (
                        <td className="px-3 py-2 align-middle whitespace-nowrap font-medium">
                          {c.name}
                        </td>
                      )}
                      {visibleColumns.email && (
                        <td className="px-3 py-2 align-middle whitespace-nowrap">
                          {c.email}
                        </td>
                      )}
                      {visibleColumns.org && (
                        <td className="px-3 py-2 align-middle whitespace-nowrap">
                          {c.org}
                        </td>
                      )}
                      {visibleColumns.phone && (
                        <td className="px-3 py-2 align-middle whitespace-nowrap">
                          {c.phone}
                        </td>
                      )}
                      {visibleColumns.groups && (
                        <td className="px-3 py-2 align-middle whitespace-nowrap">
                          {c.groups}
                        </td>
                      )}
                      <td className="px-3 py-2 align-middle">
                        <button
                          className="p-1.5 rounded-lg hover:bg-gray-100"
                          title="Show Attributes"
                          onClick={() => handleShowAttributes(c)}
                        >
                          <Eye className="w-5 h-5 text-gray-500" />
                        </button>
                      </td>
                      <td className="px-3 py-2 align-middle text-right">
                        <span className="text-xl font-bold text-gray-400">
                          &hellip;
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <span>
              {selected.length} of {filteredContacts.length} row(s) selected.
            </span>
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>10</option>
              </select>
              <span>Page 1 of 1</span>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronsLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Modal for attributes */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[90vw]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">
                    Attributes for {modalContact?.name}
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-700 text-2xl px-2"
                    onClick={() => setModalOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                {modalAttributes.length === 0 ? (
                  <div className="text-gray-500">No attributes found.</div>
                ) : (
                  <ul className="space-y-2">
                    {modalAttributes.map((a, i) => (
                      <li
                        key={i}
                        className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium inline-block"
                      >
                        {a.label}: {a.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
