import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function CreateEvent({ isOpen, onClose, onSubmit }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "CUSTOM",
    country: "",
    state: ""
  });

  const handleInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitEvent = () => {
    // Call the onSubmit callback with the event data
    onSubmit(newEvent);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewEvent({
      title: "",
      description: "",
      date: "",
      type: "CUSTOM",
      country: "",
      state: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Event</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Add a new event to your calendar.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              type="text"
              value={newEvent.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full"
              placeholder="Enter event title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              value={newEvent.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full"
              placeholder="Enter event description"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {newEvent.type}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
                <DropdownMenuItem onClick={() => handleInputChange('type', 'HOLIDAY')}>
                  HOLIDAY
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleInputChange('type', 'FESTIVAL')}>
                  FESTIVAL
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleInputChange('type', 'CUSTOM')}>
                  CUSTOM
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleInputChange('type', 'BIRTHDAY')}>
                  BIRTHDAY
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleInputChange('type', 'ANNIVERSARY')}>
                  ANNIVERSARY
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country (optional)
            </label>
            <Input
              type="text"
              value={newEvent.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full"
              placeholder="Enter country"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State (optional)
            </label>
            <Input
              type="text"
              value={newEvent.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full"
              placeholder="Enter state"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitEvent}
            className="bg-black text-white hover:bg-gray-800"
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}
