import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Calendar, Info, ChevronDown } from "lucide-react";
import TemplatePreview from "@/components/ui/template-preview";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


const campaignTypes = ["SCHEDULED_MARKETING", "MARKETING"];
const sendToOptions = ["Groups", "Contacts"];
// Simulated templates from Templates page
const templates = [
  {
    id: "1051926480263848",
    name: "sports_wander_marketing",
    category: "MARKETING",
    language: "en",
    status: "APPROVED",
    body: "Hey there! Check out our new sports wander campaign.",
    footer: "Unsubscribe anytime.",
  },
  {
    id: "1825255608261986",
    name: "nutz",
    category: "MARKETING",
    language: "en",
    status: "APPROVED",
    body: "Nutz offer just for you!",
    footer: "Reply STOP to opt out.",
  },
];

export default function CreateCampaign() {
  const [campaignType, setCampaignType] = useState(campaignTypes[0]);
  const [showMarketingMsg, setShowMarketingMsg] = useState(false);
  const [sendTo, setSendTo] = useState(sendToOptions[0]);
  // Show the first template by default so the preview is visible immediately
  const [template, setTemplate] = useState(templates[0]);
  const [campaignName, setCampaignName] = useState("");
  const [groups, setGroups] = useState([]);
  const [scheduleTime, setScheduleTime] = useState("");

  return (
    <SidebarProvider>
        <AppSidebar />

      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="flex flex-col w-full bg-gray-50 p-6">
          <h1 className="text-2xl font-bold mb-8">Create New Campaign</h1>
          <div className="flex flex-row gap-8">
            {/* Left: Campaign Details */}
            <div className="flex-1 min-w-[350px]">
              <div className="space-y-5">
                {/* Campaign Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Campaign Name</label>
                  <Input
                    placeholder="Enter campaign name"
                    value={campaignName}
                    onChange={e => setCampaignName(e.target.value)}
                  />
                </div>
                {/* Campaign Type & Template */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Campaign Type</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>{campaignType === "SCHEDULED_MARKETING" ? "Scheduled Marketing" : "Marketing"}</span>
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-auto">
                        <DropdownMenuItem onClick={() => {
                          setCampaignType("SCHEDULED_MARKETING");
                          setShowMarketingMsg(true);
                        }}>
                          Scheduled Marketing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setCampaignType("MARKETING");
                          setShowMarketingMsg(false);
                        }}>
                          Marketing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Show message if Scheduled Marketing is selected */}
                    {showMarketingMsg && (
                      <div className="mt-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg px-3 py-2 flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5" />
                        <span>Messages will be sent immediately after campaign creation to all contacts in the selected groups.</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Template</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>{template ? template.name : "Select a template"}</span>
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-auto">
                        {templates.map(t => (
                          <DropdownMenuItem key={t.id} onClick={() => setTemplate(t)}>
                            {t.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Send To */}
                <div>
                  <label className="block text-sm font-medium mb-1">Send To</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <span>{sendTo}</span>
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] w-auto">
                      {sendToOptions.map(option => (
                        <DropdownMenuItem key={option} onClick={() => setSendTo(option)}>
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Select Groups */}
                <div>
                  <label className="block text-sm font-medium mb-1">Select Groups</label>
                  <Input placeholder="Search groups..." />
                </div>
                {/* Schedule Send Time */}
                <div>
                  <label className="block text-sm font-medium mb-1">Schedule Send Time</label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={e => setScheduleTime(e.target.value)}
                      className="pr-4"
                    />
              </div>
                </div>
              </div>
              {/* Footer Buttons (outside card) */}
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-black text-white hover:bg-gray-800">Create Campaign</Button>
          </div>
            </div>
            {/* Right: Template Preview */}
            <div className="w-[380px] flex-shrink-0">
              {/* <h2 className="text-xl font-semibold mb-6">Template Preview</h2> */}
              <div className="min-h-[250px] flex items-center justify-center text-gray-400 pl-4 pb-4">
                {template ? (
                  <TemplatePreview
                    body={template.body}
                    footer={template.footer}
                  />
                ) : (
                  <span>Select a template to preview</span>
                )}
              </div>
          
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
