import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { SlidersHorizontal, Pencil, Trash2 } from "lucide-react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarProvider, SidebarInset } from "../../components/ui/sidebar";

const initialAttributes = [
  {
    id: "0ef0223b-ef6d-48c9-86f3-84a3dca3052f",
    name: "Email",
  },
  {
    id: "98ae5486-5811-476d-9f7e-b5cd2c0a6a0d",
    name: "Organization_name",
  },
];

export default function ContactAttributes() {
  const [search, setSearch] = useState("");
  const [attributes, setAttributes] = useState(initialAttributes);
  const [selected, setSelected] = useState([]);

  const filtered = attributes.filter(
    (attr) =>
      attr.name.toLowerCase().includes(search.toLowerCase()) ||
      attr.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    setSelected(checked ? filtered.map((a) => a.id) : []);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="p-6 w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2 md:mb-4">Attribute Name</h1>
            {/* Header with Search and Actions */}
            <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                {/* Search box on the left */}
                <div className="w-full max-w-md">
                  <div className="relative">
                    <Input
                      className="pl-10 rounded-lg text-base bg-white border-gray-200"
                      placeholder="Search Attribute Names..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Actions on the right */}
                <div className="flex flex-row gap-2 items-center">
                  <Button variant="outline" className="gap-2 font-medium">
                    <SlidersHorizontal size={18} /> View
                  </Button>
                  <Button variant="outline" className="font-medium">
                    Contacts
                  </Button>
                  <Button variant="outline" className="font-medium">
                    Contact Groups
                  </Button>
                  <Button className="bg-black text-white font-medium hover:bg-gray-900">
                    Add Attribute Name
                  </Button>
                </div>
              </div>
            </div>
            

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs font-semibold text-gray-700 bg-gray-50 border-b rounded-t-lg">
                    <th className="px-3 py-2 w-10 rounded-tl-lg">
                      <input
                        type="checkbox"
                        checked={
                          filtered.length > 0 &&
                          selected.length === filtered.length
                        }
                        ref={(el) => {
                          if (el)
                            el.indeterminate =
                              selected.length > 0 &&
                              selected.length < filtered.length;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th className="px-3 py-2 text-left">
                      Id <span className="align-left">⇅</span>
                    </th>
                    <th className="px-3 py-2 text-left">
                      Attribute Name <span className="align-left">⇅</span>
                    </th>
                    <th className="px-3 py-2 w-20 rounded-tr-lg"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-400 text-base"
                      >
                        No attributes found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((attr) => (
                      <tr
                        key={attr.id}
                        className="border-t border-gray-100 hover:bg-gray-50 even-row-height"
                      >
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selected.includes(attr.id)}
                            onChange={() => handleSelect(attr.id)}
                          />
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 font-medium whitespace-nowrap">
                          {attr.id}
                        </td>
                        <td className="px-3 py-2 text-base text-gray-900 font-medium">
                          {attr.name}
                        </td>
                        <td className="px-3 py-2 text-right flex gap-2 justify-end">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100">
                            <Pencil size={18} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            </div>

            {/* Pagination */}
          </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-1 mt-3">
              <div className="text-gray-500 text-sm">
                {selected.length} of {filtered.length} row(s) selected.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Rows per page</span>
                <select
                  className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
                  defaultValue={10}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700">Page 1 of 1</span>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-700"
                  disabled
                >
                  {"<<"}
                </button>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-700"
                  disabled
                >
                  {"<"}
                </button>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-700"
                  disabled
                >
                  {">"}
                </button>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-700"
                  disabled
                >
                  {">>"}
                </button>
              </div>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
