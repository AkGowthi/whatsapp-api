import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Paperclip,
  Mic,
  SendHorizontal,
  Smile,
  ChevronDown,
  Image,
  FileText,
  Video,
  Music,
  MessageSquarePlus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Pin, Trash2, X, MailMinus } from "lucide-react";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState("919740010022");
  const [messageInput, setMessageInput] = useState("");
  const [hoveredChat, setHoveredChat] = useState(null);
  const [dropdownOpenChatId, setDropdownOpenChatId] = useState(null);

  // Sample chat data
  const chats = [
    {
      id: "919740010022",
      name: "919740010022",
      lastMessage: "Luking to order organic turmer...",
      time: "08/07/2025",
      unreadCount: 9,
    },
    {
      id: "917373547116",
      name: "917373547116",
      lastMessage: "https://maps.app.goo.gl/TNjpX...",
      time: "07/25/2025",
      unreadCount: 9,
    },
    {
      id: "918428424648",
      name: "918428424648",
      lastMessage: "Hello",
      time: "06/21/2025",
      unreadCount: 9,
    },
    {
      id: "Gowtham",
      name: "Gowtham",
      lastMessage: "Hi",
      time: "06/10/2025",
      unreadCount: null,
      initial: "G",
    },
    {
      id: "919043912573",
      name: "919043912573",
      lastMessage: "Media message",
      time: "05/15/2025",
      unreadCount: 9,
    },
    {
      id: "917411567513",
      name: "917411567513",
      lastMessage: "Media message",
      time: "05/14/2025",
      unreadCount: 9,
    },
    {
      id: "919445520849",
      name: "919445520849",
      lastMessage: "Brother Please send your produ...",
      time: "05/12/2025",
      unreadCount: 9,
    },
  ];

  // Sample messages for selected chat
  const messages = [
    {
      id: 1,
      sender: "contact",
      message: "Hi",
      time: "03:10 PM",
      status: "Read by Mohan Babu",
      date: "August 7, 2025",
    },
    {
      id: 2,
      sender: "contact",
      message: "Luking to order organic turmeric",
      time: "03:10 PM",
      status: "Read by Mohan Babu",
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message logic here
      setMessageInput("");
    }
  };

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
                <BreadcrumbPage>Chats</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Chat List Panel */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Chat List Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-semibold">Chats</h2>
                </div>
                <div className="flex items-center gap-2">
                  {/* New Chat Button */}
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                    title="New Chat"
                  >
                    <MessageSquarePlus className="w-5 h-5" />
                  </Button>


                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="border bg-white text-black hover:bg-gray-400 hover:text-white shadow-none" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-blue-600 cursor-pointer">
                        <Pin className="w-4 h-4 mr-2" />
                        <span>Pin Chat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-orange-600 cursor-pointer">
                        <MailMinus className="w-4 h-4 mr-2" />
                        <span>Clear Messages</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <X className="w-4 h-4 mr-2" />
                        <span>Close Chat</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" />
                        <span>Delete Chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search chats..." className="pl-10" />
              </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {chats.map((chat, index) => {
                  const showDropdown =
                    selectedChat === chat.id &&
                    (hoveredChat === chat.id || dropdownOpenChatId === chat.id);
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      onMouseEnter={() => setHoveredChat(chat.id)}
                      onMouseLeave={() => setHoveredChat(null)}
                      className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                        selectedChat === chat.id ? "border border-gray-200" : ""
                      }`}
                      style={
                        selectedChat === chat.id
                          ? { backgroundColor: "#f5f5f5" }
                          : {}
                      }
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gray-200 text-gray-600">
                            {chat.initial || chat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unreadCount && (
                          <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {chat.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <Pin className="w-3 h-3 text-gray-400 fill-current" />
                            )}
                            <span className="text-xs text-gray-500">
                              {chat.time}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Conversation Panel */}
          <div className="flex-1 bg-white flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {selectedChat.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedChat}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="relative flex-1">
              <ScrollArea
                className="h-full p-4 pb-28"
                style={{
                  backgroundColor: "#EEE6DB",
                  backgroundImage: `url('/AnimalVector.svg')`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "500px",
                  backgroundPosition: "center",
                }}
              >
                <div className="space-y-4">
                  {/* Date Separator */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      August 7, 2025
                    </div>
                  </div>

                  {/* Messages */}
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-2">
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs shadow-sm">
                          <p className="text-gray-900 text-sm">
                            {message.message}
                          </p>
                          <div className="flex items-center justify-end mt-2">
                            <span className="text-[10px] text-gray-500">
                              {message.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      {message.status && (
                        <p className="text-xs text-gray-500 ml-1">
                          {message.status}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {/* Fixed Message Input Bar */}
              <div className="absolute left-0 right-0 bottom-0 p-4 bg-transparent">
                <div className="flex flex-row items-center gap-2">
                  {/* Input with icons and send button inside */}
                  <div className="flex-1 relative">
                    <div className="flex items-center border border-gray-300 rounded-full bg-white px-2">
                      {/* Textarea */}
                      <Textarea
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="resize-none border-0 shadow-none focus-visible:ring-0 flex-1 min-h-[40px] max-h-[40px] pt-2.5"
                        rows={1}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />

                      {/* Icons inside input */}
                      <div className="flex items-center gap-1 pl-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                        >
                          <Image className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                        >
                          <FileText className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                        >
                          <Video className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                        >
                          <Music className="w-5 h-5 mr-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-8 mr-1 bg-green-500 hover:!bg-green-600 !opacity-100 rounded-full cursor-pointer">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      size="sm"
                      className="h-8 w-8 bg-transparent !opacity-100"
                    >
                      <SendHorizontal className="w-5 h-5 " />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
