import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  List,
  Globe,
  ChevronDown,
  Grid3X3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Template data
const templates = [
  {
    id: 1,
    title: "ORDER CREATED",
    message: "Hello {{customer_name}}, Your order has been placed successfully! 🎉...",
    time: "4:54 PM",
    category: "ORDER",
    status: "approved",
  },
  {
    id: 2,
    title: "ABANDONED CART 2",
    message: "🛒 Still thinking it over?* Hey there! Your cart is...",
    time: "4:54 PM",
    category: "CART",
    status: "approved",
  },
  {
    id: 3,
    title: "STATUS REFUNDED",
    message: "🔄 Refund Processed Successfully!* ...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 4,
    title: "STATUS DELETED",
    message: "⚠️ Hi {{customer_name}}, Your order #{{order_id}}...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 5,
    title: "STATUS FAILED",
    message: "Hello {{customer_name}}, ❌ Unfortunately, your order payment has failed 😞...",
    time: "4:54 PM",
    category: "STATUS",
    status: "rejected",
  },
  {
    id: 6,
    title: "STATUS PROCESSING",
    message: "Hello {{customer_name}}, ⚙️ Your order is being processed * 🚀...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 7,
    title: "STATUS PAYMENT PENDING",
    message: "Hello {{customer_name}}, 💳 Your order is awaiting payment * 💰...",
    time: "4:54 PM",
    category: "PAYMENT",
    status: "pending",
  },
  {
    id: 8,
    title: "PASSWORD RESET",
    message: "🔐 Hi {{user_name}}! 👋 We received a request o...",
    time: "4:54 PM",
    category: "AUTH",
    status: "approved",
  },
  {
    id: 9,
    title: "ABANDONED CART",
    message: "Hello {{customer_name}}, 🛒 You left some items in your cart 🛍️...",
    time: "4:54 PM",
    category: "CART",
    status: "approved",
  },
  {
    id: 10,
    title: "STATUS CREATED",
    message: "Hello {{customer_name}}, ✅ Your order has been placed successfully! 🎉*...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 11,
    title: "STATUS COMPLETED",
    message: "Hello {{customer_name}}, ✅ Your order has been completed successfully!...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 12,
    title: "STATUS CANCELLED",
    message: "Hello {{customer_name}}, ❌ Your order has been cancelled *...",
    time: "4:54 PM",
    category: "STATUS",
    status: "rejected",
  },
  {
    id: 13,
    title: "STATUS DELETED",
    message: "Hello {{customer_name}}, Your order has been...",
    time: "4:54 PM",
    category: "STATUS",
    status: "approved",
  },
  {
    id: 14,
    title: "STATUS ON HOLD",
    message: "Hello {{customer_name}}, 🔄 Your order is currently on hold * 📋...",
    time: "4:54 PM",
    category: "STATUS",
    status: "pending",
  },
  {
    id: 15,
    title: "TRACKING UPDATE",
    message: "Dear {{customer_name}}, Your order from...",
    time: "4:54 PM",
    category: "TRACKING",
    status: "approved",
  },
  {
    id: 16,
    title: "ORDER STATUS COMPLETED",
    message: "Hello {{customer_name}}, ✅ Your order has been completed successfully!...",
    time: "4:54 PM",
    category: "ORDER",
    status: "approved",
  },
  {
    id: 17,
    title: "ORDER STATUS PROCESSING",
    message: "Hello {{customer_name}}, ⚙️ Your order is being processed * 🚀...",
    time: "4:54 PM",
    category: "ORDER",
    status: "approved",
  },
  {
    id: 18,
    title: "ORDER STATUS ON-HOLD",
    message: "Hello {{customer_name}}, 🔄 Your order is currently on hold * 📋...",
    time: "4:54 PM",
    category: "ORDER",
    status: "pending",
  },
  {
    id: 19,
    title: "ORDER STATUS FAILED",
    message: "Hello {{customer_name}}, ❌ Unfortunately, your order payment has failed * 💸...",
    time: "4:54 PM",
    category: "ORDER",
    status: "rejected",
  },
  {
    id: 20,
    title: "ORDER STATUS PAYMENT PENDING",
    message: "Hello {{customer_name}}, 💳 Your order is awaiting payment * 💰...",
    time: "4:54 PM",
    category: "ORDER",
    status: "pending",
  },
];

const categories = [
  "ALL",
  "ORDER",
  "CART", 
  "STATUS",
  "PAYMENT",
  "AUTH",
  "TRACKING",
];

const languages = [
  "English",
  "Tamil",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Telugu",
];

export default function TemplateLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedType, setSelectedType] = useState("All");

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // For demo, type filter is not mapped to template data, but you can add a 'type' property to each template if needed.
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    // For now, all templates are shown for all types, but you can add a 'type' property to each template and filter here.
    const matchesType = selectedType === "All" || (template.type && template.type === selectedType);
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Template Library</h1>
            <div className="flex items-center gap-3">
              <Button
                className="bg-black text-white hover:bg-gray-800 gap-2"
                onClick={() => navigate("/add-template")}
              >
                Create template
              </Button>
              <div className="flex items-center gap-1 border rounded-lg cursor-pointer">
                <Button
                  className="bg-white hover:bg-gray-800 hover:text-white text-black px-2"
                  onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                >
                  {viewMode === "list" ? (
                    <Grid3X3 className="w-4 h-4 hover:text-white" />
                  ) : (
                    <List className="w-4 h-4 hover:text-white" />
                  )}
                  {viewMode === "list" ? "Grid View" : "List View"}
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}

          <div className="flex items-center gap-4 mb-6">
            {/* Type Dropdown Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between bg-white gap-2">
                  {selectedType || "All"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setSelectedType("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedType("Utility")}>Utility</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedType("Marketing")}>Marketing</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedType("Authentication")}>Authentication</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white gap-2">
                  <Filter className="w-4 h-4" />
                  Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-gray-100" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language}
                    onSelect={() => setSelectedLanguage(language)}
                    className={selectedLanguage === language ? "bg-gray-100" : ""}
                  >
                    {language}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Templates Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col justify-between items-center bg-white rounded-lg border border-gray-200 p-4"
                >
                  <div>
                  {/* Template Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-2">
                      <div className={`w-3 h-3 mt-[2px] rounded-full ${getStatusDot(template.status)}`} />
                      <h3 className="font-medium text-sm text-gray-900 leading-tight">
                        {template.title}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 focus-visible:ring-0 hover:bg-white items-start p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Template Message */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {template.message}
                    </p>
                  </div>
                  </div>

                  {/* Template Footer */}
                  <div className="flex flex-row items-center justify-end w-full">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-7 px-3 bg-gray-400 text-white shadow-none"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  {/* Left side - Status dot, title and message */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusDot(template.status)}`} />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900 mb-1">
                        {template.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {template.message}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right side - Category badge and actions */}
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-7 px-3"
                    >
                      Use Template
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-black text-white"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
              >
                2
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
