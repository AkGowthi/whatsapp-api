import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Filter, MoreVertical, Plus, Settings2, RefreshCcw, ChevronDown } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Checkbox } from "@/components/ui/checkbox"

export default function Templates() {
  const [selectedRows, setSelectedRows] = useState([])
  const [statusFilter, setStatusFilter] = useState([])
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    id: true,
    category: true,
    language: true,
    status: true,
  })
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "PAUSED",
    "DISABLED",
  ]

  // Sample template data
  const templates = [
    {
      id: "1051926480263848",
      name: "sports_wander_marketing",
      category: "MARKETING",
      language: "en",
      status: "APPROVED",
    },
    {
      id: "1825255608261986",
      name: "nutz",
      category: "MARKETING", 
      language: "en",
      status: "APPROVED",
    },
  ]

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(templates.map(template => template.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">APPROVED</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">PENDING</Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">REJECTED</Badge>
      case "PAUSED":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">PAUSED</Badge>
      case "DISABLED":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">DISABLED</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryBadge = (category) => {
    switch (category) {
      case "MARKETING":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">MARKETING</Badge>
      case "UTILITY":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">UTILITY</Badge>
      case "AUTHENTICATION":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">AUTHENTICATION</Badge>
      default:
        return <Badge variant="secondary">{category}</Badge>
    }
  }

  // Column definitions for toggling
  const columns = [
    { key: 'name', label: 'TemplateName' },
    { key: 'id', label: 'TemplateId' },
    { key: 'category', label: 'Category' },
    { key: 'language', label: 'Language' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-gray-50">
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Templates</h1>
            
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative bg-white rounded-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-80"
                  />
                </div>

                {/* Status Filter */}
                <DropdownMenu open={statusDropdownOpen} onOpenChange={setStatusDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 !px-3 !border-dashed focus:!ring-0">
                      <Plus className="w-4 h-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="mt-1 w-56">
                    <div className="p-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Status"
                          className="pl-10"
                          // Optionally implement search for statuses
                        />
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {statusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={e => {
                          e.preventDefault();
                          const checked = !statusFilter.includes(status);
                          if (checked) {
                            setStatusFilter([...statusFilter, status]);
                          } else {
                            setStatusFilter(statusFilter.filter((s) => s !== status));
                          }
                        }}
                      >
                        <Checkbox
                          checked={statusFilter.includes(status)}
                          tabIndex={-1}
                          className="mr-2 pointer-events-none"
                          aria-readonly
                        />
                        <span>{status}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <div className="flex justify-end p-2">
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={() => setStatusDropdownOpen(false)}
                      >
                        Submit
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                {/* View Button: Toggle columns */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Settings2 className="w-4 h-4" />
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500">Toggle columns</div>
                    <DropdownMenuSeparator />
                    {columns.map(col => (
                      <DropdownMenuCheckboxItem
                        key={col.key}
                        checked={visibleColumns[col.key]}
                        onCheckedChange={() =>
                          setVisibleColumns(v => ({ ...v, [col.key]: !v[col.key] }))
                        }
                        className="capitalize"
                      >
                        {col.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sync Button */}
                <Button variant="outline" className="gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  Sync
                </Button>

                {/* Add Template Button */}
                <Button className="bg-black text-white hover:bg-gray-800" onClick={() => navigate("/add-template") }>
                  Add Template
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.length === templates.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    {visibleColumns.name && (
                      <TableHead className="cursor-pointer">
                        <div className="flex items-center gap-1">
                          Template Name
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                    )}
                    {visibleColumns.id && (
                      <TableHead className="cursor-pointer">
                        <div className="flex items-center gap-1">
                          Template ID
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                    )}
                    {visibleColumns.category && (
                      <TableHead className="cursor-pointer">
                        <div className="flex items-center gap-1">
                          Category
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                    )}
                    {visibleColumns.language && (
                      <TableHead className="cursor-pointer">
                        <div className="flex items-center gap-1">
                          Language
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                    )}
                    {visibleColumns.status && (
                      <TableHead className="cursor-pointer">
                        <div className="flex items-center gap-1">
                          Status
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                    )}
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(template.id)}
                          onCheckedChange={(checked) => handleSelectRow(template.id, checked)}
                        />
                      </TableCell>
                      {visibleColumns.name && (
                        <TableCell className="font-medium">{template.name}</TableCell>
                      )}
                      {visibleColumns.id && (
                        <TableCell className="text-gray-600">{template.id}</TableCell>
                      )}
                      {visibleColumns.category && (
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                      )}
                      {visibleColumns.language && (
                        <TableCell>{template.language}</TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell>{getStatusBadge(template.status)}</TableCell>
                      )}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                {selectedRows.length} of {templates.length} row(s) selected.
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Rows per page</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        10
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>10</DropdownMenuItem>
                      <DropdownMenuItem>20</DropdownMenuItem>
                      <DropdownMenuItem>50</DropdownMenuItem>
                      <DropdownMenuItem>100</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-gray-600">
                  Page 1 of 1
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    ‹‹
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    ‹
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    ›
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    ››
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
