import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Play,
  Pause,
  Eye,
  Settings2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Campaign data
const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    status: "Active",
    type: "Promotional",
    audience: "All Customers",
    sent: 15420,
    delivered: 14892,
    opened: 8934,
    clicked: 2144,
    createdDate: "2024-08-15",
    scheduledDate: "2024-08-20",
    template: "SUMMER_SALE_TEMPLATE",
  },
  {
    id: 2,
    name: "Account Verification",
    status: "Scheduled",
    type: "Authentication",
    audience: "New Signups",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    createdDate: "2024-08-22",
    scheduledDate: "2024-08-25",
    template: "VERIFICATION_TEMPLATE",
  },
  {
    id: 3,
    name: "Order Status Updates",
    status: "Running",
    type: "Utility",
    audience: "Active Orders",
    sent: 8743,
    delivered: 8456,
    opened: 5234,
    clicked: 1567,
    createdDate: "2024-08-10",
    scheduledDate: "Ongoing",
    template: "ORDER_STATUS_TEMPLATE",
  },
  {
    id: 4,
    name: "Flash Sale Alert",
    status: "Completed",
    type: "Promotional",
    audience: "VIP Customers",
    sent: 2340,
    delivered: 2298,
    opened: 1876,
    clicked: 834,
    createdDate: "2024-08-05",
    scheduledDate: "2024-08-08",
    template: "FLASH_SALE_TEMPLATE",
  },
  {
    id: 5,
    name: "Password Reset Notifications",
    status: "Draft",
    type: "Authentication",
    audience: "Security Requests",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    createdDate: "2024-08-23",
    scheduledDate: "TBD",
    template: "PASSWORD_RESET_TEMPLATE",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Scheduled: "bg-blue-100 text-blue-800",
  Running: "bg-yellow-100 text-yellow-800",
  Completed: "bg-gray-100 text-gray-800",
  Draft: "bg-orange-100 text-orange-800",
  Paused: "bg-red-100 text-red-800",
};

const campaignTypes = ["All", "Utility", "Promotional", "Authentication"];
const campaignStatuses = ["All", "Active", "Scheduled", "Running", "Completed", "Draft", "Paused"];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    status: true,
    type: true,
    sent: true,
    delivered: true,
    opened: true,
    clicked: true,
    scheduled: true,
  });

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.audience.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || campaign.type === selectedType;
    const matchesStatus = selectedStatus === "All" || campaign.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate summary stats
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === "Active" || c.status === "Running").length;
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalDelivered = campaigns.reduce((sum, c) => sum + c.delivered, 0);

  // Column definitions for toggling
  const columns = [
    { key: 'name', label: 'Campaign Name' },
    { key: 'status', label: 'Status' },
    { key: 'type', label: 'Type' },
    { key: 'sent', label: 'Sent' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'opened', label: 'Opened' },
    { key: 'clicked', label: 'Clicked' },
    { key: 'scheduled', label: 'Scheduled' },
  ];

  const getActionButton = (campaign) => {
    switch (campaign.status) {
      case "Draft":
        return (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="w-4 h-4 mr-1" />
            Launch
          </Button>
        );
      case "Active":
      case "Running":
        return (
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
        );
      case "Scheduled":
        return (
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4 mr-1" />
            Edit
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Campaigns</h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCampaigns}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCampaigns}</div>
                <p className="text-xs text-muted-foreground">
                  Currently running
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total across all campaigns
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average delivery rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            <div className="flex items-center gap-3">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white gap-2">
                  <Filter className="w-4 h-4" />
                  Type: {selectedType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {campaignTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-gray-100" : ""}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Status: {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {campaignStatuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? "bg-gray-100" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Button: Toggle columns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white gap-2">
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

            <Button className="bg-black text-white hover:bg-gray-800">
              Create Campaign
            </Button>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="w-full ">
                <thead className="border-b bg-gray-50 ">
                  <tr className="rounded-t-lg">
                    {visibleColumns.name && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Campaign Name</th>
                    )}
                    {visibleColumns.status && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Status</th>
                    )}
                    {visibleColumns.type && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Type</th>
                    )}
                    {visibleColumns.sent && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Sent</th>
                    )}
                    {visibleColumns.delivered && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Delivered</th>
                    )}
                    {visibleColumns.opened && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Opened</th>
                    )}
                    {visibleColumns.clicked && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Clicked</th>
                    )}
                    {visibleColumns.scheduled && (
                      <th className="text-left p-4 font-medium text-sm text-gray-900">Scheduled</th>
                    )}
                    <th className="text-left p-4 font-medium text-sm text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b hover:bg-gray-50">
                      {visibleColumns.name && (
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{campaign.name}</div>
                            <div className="text-xs text-gray-500">Created: {campaign.createdDate}</div>
                          </div>
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td className="p-4">
                          <Badge 
                            variant="outline" 
                            className={`${statusColors[campaign.status]} border-0`}
                          >
                            {campaign.status}
                          </Badge>
                        </td>
                      )}
                      {visibleColumns.type && (
                        <td className="p-4 text-sm text-gray-600">{campaign.type}</td>
                      )}
                      {visibleColumns.sent && (
                        <td className="p-4 text-sm text-gray-600">{campaign.sent.toLocaleString()}</td>
                      )}
                      {visibleColumns.delivered && (
                        <td className="p-4 text-sm text-gray-600">{campaign.delivered.toLocaleString()}</td>
                      )}
                      {visibleColumns.opened && (
                        <td className="p-4 text-sm text-gray-600">{campaign.opened.toLocaleString()}</td>
                      )}
                      {visibleColumns.clicked && (
                        <td className="p-4 text-sm text-gray-600">{campaign.clicked.toLocaleString()}</td>
                      )}
                      {visibleColumns.scheduled && (
                        <td className="p-4 text-sm text-gray-600">{campaign.scheduledDate}</td>
                      )}
                      <td className="p-4">
                        <div className="flex justify-between items-center gap-2">
                          {getActionButton(campaign)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Analytics</DropdownMenuItem>
                              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-black text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                3
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
