import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import CreateEvent from "./CreateEvent";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Sample events data (important global and Indian holidays/festivals for all months)
const events = [
  // January
  { id: 1, title: "New Year's Day", date: "2025-01-01", type: "Holiday", color: "text-blue-600" },
  { id: 2, title: "Pongal", date: "2025-01-14", type: "Festival", color: "text-orange-600" },
  { id: 3, title: "Republic Day (India)", date: "2025-01-26", type: "Holiday", color: "text-green-600" },

  // February
  { id: 4, title: "Chinese New Year", date: "2025-02-01", type: "Festival", color: "text-red-600" },
  { id: 5, title: "Maha Shivaratri", date: "2025-02-26", type: "Festival", color: "text-purple-600" },

  // March
  { id: 6, title: "Holi", date: "2025-03-14", type: "Festival", color: "text-pink-600" },
  { id: 7, title: "International Women's Day", date: "2025-03-08", type: "Holiday", color: "text-fuchsia-600" },

  // April
  { id: 8, title: "Good Friday", date: "2025-04-18", type: "Holiday", color: "text-blue-700" },
  { id: 9, title: "Easter", date: "2025-04-20", type: "Holiday", color: "text-yellow-600" },
  { id: 10, title: "Ram Navami", date: "2025-04-06", type: "Festival", color: "text-orange-700" },

  // May
  { id: 11, title: "Labour Day", date: "2025-05-01", type: "Holiday", color: "text-gray-700" },
  { id: 12, title: "Buddha Purnima", date: "2025-05-12", type: "Festival", color: "text-yellow-700" },

  // June
  { id: 13, title: "Eid al-Adha", date: "2025-06-07", type: "Holiday", color: "text-green-700" },

  // July
  { id: 14, title: "Independence Day (USA)", date: "2025-07-04", type: "Holiday", color: "text-blue-800" },
  { id: 15, title: "Guru Purnima", date: "2025-07-10", type: "Festival", color: "text-purple-700" },

  // August
  { id: 16, title: "Raksha Bandhan", date: "2025-08-09", type: "Holiday", color: "text-red-600" },
  { id: 17, title: "Janmashtami", date: "2025-08-15", type: "Holiday", color: "text-blue-600" },
  { id: 18, title: "Parsi New Year", date: "2025-08-16", type: "Festival", color: "text-purple-600" },
  { id: 19, title: "Independence Day (India)", date: "2025-08-15", type: "Holiday", color: "text-green-600" },
  { id: 20, title: "Ganesh Chaturthi", date: "2025-08-27", type: "Festival", color: "text-orange-600" },

  // September
  { id: 21, title: "Milad un-Nabi", date: "2025-09-05", type: "Holiday", color: "text-green-600" },
  { id: 22, title: "Onam", date: "2025-09-05", type: "Festival", color: "text-pink-600" },
  { id: 23, title: "Ganesh Visarjan", date: "2025-09-06", type: "Festival", color: "text-orange-700" },

  // October
  { id: 24, title: "Gandhi Jayanti", date: "2025-10-02", type: "Holiday", color: "text-green-700" },
  { id: 25, title: "Navratri Begins", date: "2025-10-01", type: "Festival", color: "text-pink-700" },
  { id: 26, title: "Dussehra", date: "2025-10-11", type: "Festival", color: "text-red-700" },
  { id: 27, title: "Halloween", date: "2025-10-31", type: "Festival", color: "text-orange-800" },

  // November
  { id: 28, title: "Diwali", date: "2025-10-20", type: "Festival", color: "text-yellow-500" },
  { id: 29, title: "Bhai Dooj", date: "2025-10-22", type: "Festival", color: "text-red-500" },
  { id: 30, title: "Thanksgiving (USA)", date: "2025-11-27", type: "Holiday", color: "text-orange-900" },

  // December
  { id: 31, title: "Christmas", date: "2025-12-25", type: "Holiday", color: "text-green-800" },
  { id: 32, title: "Boxing Day", date: "2025-12-26", type: "Holiday", color: "text-blue-900" },
  { id: 33, title: "New Year's Eve", date: "2025-12-31", type: "Holiday", color: "text-blue-600" },

  // 2026
  // January
  { id: 101, title: "New Year's Day", date: "2026-01-01", type: "Holiday", color: "text-blue-600" },
  { id: 102, title: "Pongal", date: "2026-01-14", type: "Festival", color: "text-orange-600" },
  { id: 103, title: "Republic Day (India)", date: "2026-01-26", type: "Holiday", color: "text-green-600" },

  // February
  { id: 104, title: "Chinese New Year", date: "2026-02-17", type: "Festival", color: "text-red-600" },
  { id: 105, title: "Maha Shivaratri", date: "2026-02-15", type: "Festival", color: "text-purple-600" },

  // March
  { id: 106, title: "Holi", date: "2026-03-04", type: "Festival", color: "text-pink-600" },
  { id: 107, title: "International Women's Day", date: "2026-03-08", type: "Holiday", color: "text-fuchsia-600" },

  // April
  { id: 108, title: "Good Friday", date: "2026-04-03", type: "Holiday", color: "text-blue-700" },
  { id: 109, title: "Easter", date: "2026-04-05", type: "Holiday", color: "text-yellow-600" },
  { id: 110, title: "Ram Navami", date: "2026-03-27", type: "Festival", color: "text-orange-700" },

  // May
  { id: 111, title: "Labour Day", date: "2026-05-01", type: "Holiday", color: "text-gray-700" },
  { id: 112, title: "Buddha Purnima", date: "2026-05-31", type: "Festival", color: "text-yellow-700" },

  // June
  { id: 113, title: "Eid al-Adha", date: "2026-06-27", type: "Holiday", color: "text-green-700" },

  // July
  { id: 114, title: "Independence Day (USA)", date: "2026-07-04", type: "Holiday", color: "text-blue-800" },
  { id: 115, title: "Guru Purnima", date: "2026-07-29", type: "Festival", color: "text-purple-700" },

  // August
  { id: 116, title: "Raksha Bandhan", date: "2026-08-28", type: "Holiday", color: "text-red-600" },
  { id: 117, title: "Janmashtami", date: "2026-08-05", type: "Holiday", color: "text-blue-600" },
  { id: 118, title: "Parsi New Year", date: "2026-08-25", type: "Festival", color: "text-purple-600" },
  { id: 119, title: "Independence Day (India)", date: "2026-08-15", type: "Holiday", color: "text-green-600" },
  { id: 120, title: "Ganesh Chaturthi", date: "2026-08-17", type: "Festival", color: "text-orange-600" },

  // September
  { id: 121, title: "Milad un-Nabi", date: "2026-09-26", type: "Holiday", color: "text-green-600" },
  { id: 122, title: "Onam", date: "2026-08-28", type: "Festival", color: "text-pink-600" },
  { id: 123, title: "Ganesh Visarjan", date: "2026-09-06", type: "Festival", color: "text-orange-700" },

  // October
  { id: 124, title: "Gandhi Jayanti", date: "2026-10-02", type: "Holiday", color: "text-green-700" },
  { id: 125, title: "Navratri Begins", date: "2026-10-18", type: "Festival", color: "text-pink-700" },
  { id: 126, title: "Dussehra", date: "2026-10-20", type: "Festival", color: "text-red-700" },
  { id: 127, title: "Halloween", date: "2026-10-31", type: "Festival", color: "text-orange-800" },

  // November
  { id: 128, title: "Diwali", date: "2026-11-08", type: "Festival", color: "text-yellow-500" },
  { id: 129, title: "Bhai Dooj", date: "2026-11-10", type: "Festival", color: "text-red-500" },
  { id: 130, title: "Thanksgiving (USA)", date: "2026-11-26", type: "Holiday", color: "text-orange-900" },

  // December
  { id: 131, title: "Christmas", date: "2026-12-25", type: "Holiday", color: "text-green-800" },
  { id: 132, title: "Boxing Day", date: "2026-12-26", type: "Holiday", color: "text-blue-900" },
  { id: 133, title: "New Year's Eve", date: "2026-12-31", type: "Holiday", color: "text-blue-600" },
];

const eventTypes = ["All", "Holiday", "Festival", "Custom", "Birthday", "Anniversary"];

export default function CampaignCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 24)); // August 2025
  const [selectedEventType, setSelectedEventType] = useState("All");
  const [viewMode, setViewMode] = useState("Month");
  const [showInfo, setShowInfo] = useState(true); // For dismissible info alert
  const [showCreateModal, setShowCreateModal] = useState(false); // For create event modal

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDate = firstDay.getDay(); // 0 = Sunday

  // Get previous month's last days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  
  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  for (let i = startDate - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month - 1, prevMonthLastDay - i),
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      date,
    });
  }
  
  // Next month days to fill the calendar
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month + 1, day),
    });
  }

  // Filter events
  const filteredEvents = events.filter(event => {
    if (selectedEventType === "All") return true;
    return event.type === selectedEventType;
  });

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateString);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (viewMode === "Day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    } else if (viewMode === "Week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const goToNext = () => {
    if (viewMode === "Day") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    } else if (viewMode === "Week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(year, month + 1, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Modal handlers
  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSubmitEvent = (eventData) => {
    // Here you would typically save the event to your backend
    console.log("Creating event:", eventData);
    setShowCreateModal(false);
  };

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get week dates for week view
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  // Get current view title
  const getViewTitle = () => {
    if (viewMode === "Day") {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (viewMode === "Week") {
      const weekDates = getWeekDates();
      const startDate = weekDates[0];
      const endDate = weekDates[6];
      if (startDate.getMonth() === endDate.getMonth()) {
        return `Week of ${monthNames[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
      } else {
        return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${startDate.getFullYear()}`;
      }
    } else {
      return `${monthNames[month]} ${year}`;
    }
  };

  // Calculate statistics
  const upcomingEvents = events.filter(event => new Date(event.date) >= today).length;
  const campaignsScheduled = 0; // Based on your image
  const holidayEvents = events.filter(event => event.type === "Holiday").length;
  const festivalEvents = events.filter(event => event.type === "Festival").length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="flex h-full gap-6 p-6">
          {/* Main Calendar Area */}
          <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-6">Marketing Calendar</h1>

              <div className="flex gap-4">
                <div className="flex flex-col">
              {/* Dismissible Info Alert */}
              {showInfo && (
                <div className="mb-4 relative">
                  <div className="text-base rounded-lg p-4 border bg-white text-blue-600 flex items-start">
                    <span className="flex-1">
                      Global holidays and festivals are shown in this calendar. You can create campaigns for these events or add your{' '}
                        <span className="underline cursor-pointer" onClick={handleCreateEvent}>own custom events</span>.
                    </span>
                    <button
                      onClick={() => setShowInfo(false)}
                      className="ml-4 border text-gray-400 hover:text-gray-700 rounded-full p-1 focus:outline-none"
                      aria-label="Close info"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            <div className="bg-white rounded-lg border max-h-full">
              {/* Calendar Header */}
              <div className="px-6 py-4 border-b">
                {/* View Mode and Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* View Mode Segmented Control */}
                    <div className="inline-flex items-center rounded-xl bg-gray-100 p-1">
                      {["Day", "Week", "Month"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setViewMode(mode)}
                          className={
                            `px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ` +
                            (viewMode === mode
                              ? "bg-white shadow text-gray-900"
                              : "bg-transparent text-gray-500 hover:text-gray-900")
                          }
                          style={{ outline: 'none', border: 'none' }}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={goToPrevious}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="font-medium min-w-[150px] text-center">
                        {getViewTitle()}
                      </span>
                      <Button variant="ghost" size="sm" onClick={goToNext}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button className="px-4 py-1" variant="outline" size="base" onClick={goToToday}>
                      Today
                    </Button>
                  </div>

                  {/* Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 mr-1" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="text-sm focus-visible:!ring-0 pl-2 pr-1 gap-2">
                          {selectedEventType.charAt(0) + selectedEventType.slice(1).toLowerCase()}
                          <Badge variant="secondary" className="ml-1">
                            {filteredEvents.length}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {eventTypes.map((type) => (
                          <DropdownMenuItem
                            key={type}
                            onSelect={() => setSelectedEventType(type)}
                            className={selectedEventType === type ? "bg-gray-100" : ""}
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {viewMode === "Month" && (
                  <>
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-px mb-2">
                      {dayNames.map((day) => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-px border rounded-lg overflow-hidden">
                      {calendarDays.map((dayData, index) => {
                        const dayEvents = getEventsForDate(dayData.date);
                        return (
                          <div
                            key={index}
                            className={`
                              min-h-[100px] p-2 bg-white border-r border-b relative
                              ${!dayData.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
                              ${dayData.isToday ? "bg-blue-50 border-blue-200" : ""}
                            `}
                          >
                            <div className={`text-sm font-medium mb-1 ${dayData.isToday ? "text-blue-600" : ""}`}>
                              {dayData.day}
                            </div>
                            
                            {/* Events */}
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded truncate ${event.color}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>

                            {/* Add Campaign Button */}
                            {dayData.isCurrentMonth && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 hover:opacity-100 transition-opacity"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {viewMode === "Week" && (
                  <>
                    {/* Week View Header */}
                    <div className="grid grid-cols-7 gap-px mb-2">
                      {getWeekDates().map((date, index) => (
                        <div key={index} className="p-2 text-center">
                          <div className="text-sm font-medium text-gray-500">
                            {dayNames[date.getDay()]}
                          </div>
                          <div className={`text-lg font-semibold mt-1 ${
                            date.toDateString() === today.toDateString() ? "text-blue-600" : ""
                          }`}>
                            {date.getDate()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Week View Grid */}
                    <div className="grid grid-cols-7 gap-px border rounded-lg overflow-hidden">
                      {getWeekDates().map((date, index) => {
                        const dayEvents = getEventsForDate(date);
                        return (
                          <div
                            key={index}
                            className={`
                              min-h-[400px] p-3 bg-white border-r border-b relative
                              ${date.toDateString() === today.toDateString() ? "bg-blue-50 border-blue-200" : ""}
                            `}
                          >
                            {/* Events */}
                            <div className="space-y-2">
                              {dayEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-sm p-2 rounded ${event.color} bg-gray-50 border-l-4 border-current`}
                                >
                                  <div className="font-medium">{event.title}</div>
                                  <div className="text-xs opacity-75">{event.type}</div>
                                </div>
                              ))}
                            </div>

                            {/* Add Campaign Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute bottom-2 right-2 h-8 w-8 p-0 opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {viewMode === "Day" && (
                  <div className="border rounded-lg overflow-hidden">
                    {/* Day View Header */}
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">
                          {dayNames[currentDate.getDay()]}
                        </div>
                        <div className={`text-2xl font-bold mt-1 ${
                          currentDate.toDateString() === today.toDateString() ? "text-blue-600" : ""
                        }`}>
                          {currentDate.getDate()}
                        </div>
                      </div>
                    </div>

                    {/* Day View Content */}
                    <div className="p-6">
                      <div className="max-w-2xl mx-auto">
                        <h3 className="text-lg font-semibold mb-4">Events</h3>
                        {getEventsForDate(currentDate).length > 0 ? (
                          <div className="space-y-3">
                            {getEventsForDate(currentDate).map((event) => (
                              <div
                                key={event.id}
                                className={`p-4 rounded-lg border-l-4 border-current ${event.color} bg-gray-50`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-lg">{event.title}</h4>
                                    <div className="text-sm opacity-75 mt-1">
                                      <Badge variant="secondary">{event.type}</Badge>
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Create Campaign
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">No events for this day</div>
                            <div className="text-gray-400 mb-6">No campaigns for this day</div>
                            <Button className="bg-black text-white hover:bg-gray-800">
                              <Plus className="w-4 h-4 mr-2" />
                              Create Campaign for this Day
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          

          {/* Right Sidebar - Single Card with all sections */}
          <div>
            <Card className="min-w-[250px] max-h-full flex flex-col justify-between p-6">
              <div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Upcoming Events</div>
                  <div className="text-3xl font-bold mb-4">{upcomingEvents}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Campaigns Scheduled</div>
                  <div className="text-3xl font-bold mb-4">{campaignsScheduled}</div>
                </div>
                <hr className="my-4" />
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-4">Events by Type</div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Holiday</span>
                    <span className="text-sm font-medium">{holidayEvents}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Festival</span>
                    <span className="text-sm font-medium">{festivalEvents}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-4">Quick Actions</div>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 rounded-lg mb-3 p-3 text-base font-normal"
                    onClick={handleCreateEvent}
                  >
                    Create Event
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg p-3 text-base font-normal"
                    onClick={() => navigate("/create-campaign")}
                  >
                    Create Campaign
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          </div>
          </div>
        </div>
      </SidebarInset>

      {/* Create Event Modal */}
      <CreateEvent 
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEvent}
      />
    </SidebarProvider>
  );
}
