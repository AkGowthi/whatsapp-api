import { useState } from "react"
import { MessageCircle, Calendar, Users, Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

export default function Dashboard() {
  const [count, setCount] = useState(0)

  const chartData = [
    { name: "Aug 19", Marketing: 800, Utility: 600, Authentication: 400, Service: 300 }
  ]

  const chartConfig = {
    Marketing: { label: "Marketing", color: "#3b82f6" },
    Utility: { label: "Utility", color: "#10b981" },
    Authentication: { label: "Authentication", color: "#8b5cf6" },
    Service: { label: "Service", color: "#f43f5e" }
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-gray-50">

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

            {/* WhatsApp Details Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold pb-4">Whatsapp Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-base font-bold text-blue-600">1,000 conversations/24h</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Business Name</span>
                    <span className="text-sm font-medium">Sports Wander</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quality Score</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">GREEN</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Message Status</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">BLOCKED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Details Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold pb-4">Template Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Marketing Templates</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Utility Templates</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Authentication Templates</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved Templates</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rejected Templates</span>
                  <span className="text-sm font-medium">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold pb-4">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Contacts</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Campaigns</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Draft Campaigns</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Upcoming Campaigns</span>
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Completed Campaigns</span>
                  <span className="text-sm font-medium">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Amount Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold pb-4">Wallet Amount Remaining</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-center my-4">₹0.00</div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Add Money
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Message Send Analytics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Message Send Analytics</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Today</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="Marketing" fill="#3b82f6" />
                      <Bar dataKey="Utility" fill="#10b981" />
                      <Bar dataKey="Authentication" fill="#8b5cf6" />
                      <Bar dataKey="Service" fill="#f43f5e" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  No recent transactions
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
