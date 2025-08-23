import { useState, useRef } from "react";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Info,
  ChevronDown,
  Plus,
  Smile,
  Bold,
  Italic,
  Strikethrough,
  Code2,
  List,
  Database,
  SendHorizontal,
  Paperclip,
  X,
  ExternalLink,
  MessageCircle,
  Phone,
  MessageSquare,
  EllipsisVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../styles/phone-input.css";
import Authentication from "./add_template/Authentication";

const languages = [
  { label: "Afrikaans (af)", value: "af" },
  { label: "Albanian (sq)", value: "sq" },
  { label: "Arabic (ar)", value: "ar" },
  { label: "Azerbaijani (az)", value: "az" },
  { label: "Bengali (bn)", value: "bn" },
  { label: "Bulgarian (bg)", value: "bg" },
  { label: "Catalan (ca)", value: "ca" },
  { label: "Chinese (Simplified) (zh_CN)", value: "zh_CN" },
  { label: "Chinese (Traditional) (zh_TW)", value: "zh_TW" },
  { label: "Croatian (hr)", value: "hr" },
  { label: "Czech (cs)", value: "cs" },
  { label: "Danish (da)", value: "da" },
  { label: "Dutch (nl)", value: "nl" },
  { label: "English (en)", value: "en" },
  { label: "Estonian (et)", value: "et" },
  { label: "Filipino (fil)", value: "fil" },
  { label: "Finnish (fi)", value: "fi" },
  { label: "French (fr)", value: "fr" },
  { label: "Georgian (ka)", value: "ka" },
  { label: "German (de)", value: "de" },
  { label: "Greek (el)", value: "el" },
  { label: "Gujarati (gu)", value: "gu" },
  { label: "Hausa (ha)", value: "ha" },
  { label: "Hebrew (he)", value: "he" },
  { label: "Hindi (hi)", value: "hi" },
  { label: "Hungarian (hu)", value: "hu" },
  { label: "Indonesian (id)", value: "id" },
  { label: "Irish (ga)", value: "ga" },
  { label: "Italian (it)", value: "it" },
  { label: "Japanese (ja)", value: "ja" },
  { label: "Kannada (kn)", value: "kn" },
  { label: "Kazakh (kk)", value: "kk" },
  { label: "Korean (ko)", value: "ko" },
  { label: "Latvian (lv)", value: "lv" },
  { label: "Lithuanian (lt)", value: "lt" },
  { label: "Macedonian (mk)", value: "mk" },
  { label: "Malay (ms)", value: "ms" },
  { label: "Malayalam (ml)", value: "ml" },
  { label: "Marathi (mr)", value: "mr" },
  { label: "Norwegian (no)", value: "no" },
  { label: "Persian (fa)", value: "fa" },
  { label: "Polish (pl)", value: "pl" },
  { label: "Portuguese (pt_BR)", value: "pt_BR" },
  { label: "Portuguese (Portugal) (pt_PT)", value: "pt_PT" },
  { label: "Punjabi (pa)", value: "pa" },
  { label: "Romanian (ro)", value: "ro" },
  { label: "Russian (ru)", value: "ru" },
  { label: "Serbian (sr)", value: "sr" },
  { label: "Slovak (sk)", value: "sk" },
  { label: "Slovenian (sl)", value: "sl" },
  { label: "Spanish (es)", value: "es" },
  { label: "Spanish (Argentina) (es_AR)", value: "es_AR" },
  { label: "Spanish (Mexico) (es_MX)", value: "es_MX" },
  { label: "Swahili (sw)", value: "sw" },
  { label: "Swedish (sv)", value: "sv" },
  { label: "Tamil (ta)", value: "ta" },
  { label: "Telugu (te)", value: "te" },
  { label: "Thai (th)", value: "th" },
  { label: "Turkish (tr)", value: "tr" },
  { label: "Ukrainian (uk)", value: "uk" },
  { label: "Urdu (ur)", value: "ur" },
  { label: "Uzbek (uz)", value: "uz" },
  { label: "Vietnamese (vi)", value: "vi" },
  { label: "Zulu (zu)", value: "zu" },
];
const categories = [
  { label: "Marketing", value: "marketing" },
  { label: "Utility", value: "utility" },
  { label: "Authentication", value: "authentication" },
];
const headers = [
  { label: "Image", value: "image" },
  { label: "Document", value: "document" },
  { label: "Video", value: "video" },
  { label: "None", value: "none" },
];

export default function AddTemplate() {
  const [videoPreview, setVideoPreview] = useState(null);
  // Helper to get document icon based on file extension
  function getDocumentIcon(name) {
    if (!name) return "/DriveIcon.svg";
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "pdf") return "/PDF.svg";
    return "/DriveIcon.svg";
  }
  const [documentPreview, setDocumentPreview] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [templateName, setTemplateName] = useState("");
  // Set English as default language
  const [language, setLanguage] = useState("en");
  const [languageSearch, setLanguageSearch] = useState("");
  const [category, setCategory] = useState(categories[0].value);
  const [header, setHeader] = useState("none");
  const [body, setBody] = useState("");
  const [footer, setFooter] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const bodyTextareaRef = useRef(null);
  const [buttons, setButtons] = useState([]);
  const [showVariablesModal, setShowVariablesModal] = useState(false);
  const [quickReplyButtons, setQuickReplyButtons] = useState([]);
  const [newButtonText, setNewButtonText] = useState("");
  const [newButtonType, setNewButtonType] = useState("Quick Reply");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showButtonCreator, setShowButtonCreator] = useState(false);
  const [buttonPhoneNumber, setButtonPhoneNumber] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [selectedButtonType, setSelectedButtonType] = useState("");

  // Example variables for the modal
  const variables = [
    "email",
    "organization_name",
    "phone",
    "address",
    "name",
    "birthday",
    "anniversary",
    "city",
    "country",
  ];

  const buttonTypes = [
    { label: "Quick Reply", value: "quick_reply" },
    { label: "Phone Number", value: "phone_number" },
    { label: "Visit Website", value: "url" },
  ];

  // URL validation function
  const isValidUrl = (url) => {
    try {
      // Must contain at least one dot
      if (!url.includes('.')) {
        return false;
      }
      
      // Enhanced pattern that requires proper domain structure
      const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}(\/.*)?$/;
      
      if (!urlPattern.test(url)) {
        return false;
      }
      
      // Extract domain part
      let cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
      const domainPart = cleanUrl.split('/')[0];
      
      // Must have at least one dot in domain
      if (!domainPart.includes('.')) {
        return false;
      }
      
      // Check if it has a valid TLD (at least 2 characters after the last dot)
      const parts = domainPart.split('.');
      const tld = parts[parts.length - 1];
      
      // TLD must be at least 2 characters and contain only letters
      if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  };

  const addButton = () => {
    let buttonData = {
      text: newButtonText.trim() || getDefaultButtonText(selectedButtonType),
      type: selectedButtonType,
    };

    // Add type-specific data
    if (selectedButtonType === "Phone Number") {
      if (!buttonPhoneNumber || !isValidPhoneNumber(buttonPhoneNumber)) {
        alert("Please enter a valid phone number");
        return;
      }
      buttonData.phoneNumber = buttonPhoneNumber;
    } else if (selectedButtonType === "Visit Website") {
      if (!buttonUrl.trim()) {
        alert("Please enter a website URL");
        return;
      }
      if (!isValidUrl(buttonUrl.trim())) {
        alert("Please enter a valid website URL");
        return;
      }
      buttonData.url = buttonUrl.trim();
    }

    setQuickReplyButtons([...quickReplyButtons, buttonData]);
    
    // Reset form
    setNewButtonText("");
    setButtonPhoneNumber("");
    setButtonUrl("");
    setSelectedButtonType("");
    setShowButtonCreator(false);
  };

  const resetButtonCreator = () => {
    setNewButtonText("");
    setButtonPhoneNumber("");
    setButtonUrl("");
    setSelectedButtonType("");
    setShowButtonCreator(false);
  };

  const getDefaultButtonText = (type) => {
    switch (type) {
      case "Phone Number": return "Call Now";
      case "Visit Website": return "Visit Website";
      default: return "Reply";
    }
  };

  const validatePhoneNumber = () => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      alert(`Valid number: ${phoneNumber}`); // E.164 format (+919876543210)
      return true;
    } else if (phoneNumber) {
      alert("Invalid phone number");
      return false;
    }
    return true;
  };

  const getButtonIcon = (buttonType) => {
    switch (buttonType) {
      case "Quick Reply":
        return (
          <MessageSquare
            className="w-5 h-5 font-medium mr-1"
            style={{ color: "#075e54" }}
          />
        );
      case "Phone Number":
        return (
          <Phone
            className="w-5 h-5 font-medium mr-1"
            style={{ color: "#075e54" }}
          />
        );
      case "Visit Website":
        return (
          <ExternalLink
            className="w-5 h-5 font-medium mr-1"
            style={{ color: "#075e54" }}
          />
        );
      default:
        return (
          <MessageSquare
            className="w-5 h-5 font-medium mr-1"
            style={{ color: "#075e54" }}
          />
        );
    }
  };

  // Helper to insert emoji at cursor position
  const insertEmoji = (emoji) => {
    const textarea = bodyTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = body.slice(0, start) + emoji.native + body.slice(end);
    setBody(newValue);
    // Move cursor after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.native.length, start + emoji.native.length);
    }, 0);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-white">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-8">Create New Template</h1>
          <div className="flex gap-6 items-start">
            {/* Left: Form */}
            <div className="flex-1 max-w-full">
              <div className="bg-white rounded-xl border p-6 mb-6">
                {/* <div className="font-semibold mb-4 flex items-center gap-2">
                  Template Details
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      Template Name <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Template Name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value.slice(0, 512))}
                        className="bg-gray-50 pr-16"
                        maxLength={512}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                        {templateName.length}/512
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      Language
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-between w-full bg-gray-50 font-normal"
                        >
                          {languages.find((l) => l.value === language)?.label}
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[260px]">
                        <div className="p-1">
                          <input
                            type="text"
                            placeholder="Search language..."
                            value={languageSearch}
                            onChange={e => setLanguageSearch(e.target.value)}
                            className="w-full border rounded px-2 py-2 text-sm focus:outline-none"
                            onMouseDown={e => e.stopPropagation()}
                            onClick={e => e.stopPropagation()}
                            onKeyDown={e => e.stopPropagation()}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {(languageSearch
                            ? languages.filter(l => l.label.toLowerCase().includes(languageSearch.toLowerCase()))
                            : languages
                          ).map((l) => (
                            <DropdownMenuItem
                              key={l.value}
                              onMouseDown={e => {
                                e.preventDefault();
                                setLanguage(l.value);
                                setLanguageSearch("");
                              }}
                            >
                              {l.label}
                            </DropdownMenuItem>
                          ))}
                          {languageSearch && languages.filter(l => l.label.toLowerCase().includes(languageSearch.toLowerCase())).length === 0 && (
                            <div className="px-4 py-2 text-gray-400 text-sm">No results</div>
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      Category
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-between w-full bg-gray-50 font-normal"
                        >
                          {categories.find((c) => c.value === category)?.label}
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {categories.map((c) => (
                          <DropdownMenuItem
                            key={c.value}
                            onSelect={() => setCategory(c.value)}
                          >
                            {c.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Message Content or Authentication Content */}
              {category === "authentication" ? (
                <Authentication />
              ) : (
                <div className="bg-white rounded-xl border p-6 mb-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-sm font-medium mb-1">
                      Header <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-between w-full bg-gray-50 font-normal"
                        >
                          {headers.find((h) => h.value === header)?.label}
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {headers.map((h) => (
                          <DropdownMenuItem
                            key={h.value}
                            onSelect={() => setHeader(h.value)}
                          >
                            {h.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Custom file input for image */}
                    {header === "image" && (
                      <div className="mt-2">
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setImageName(file.name);
                              const reader = new FileReader();
                              reader.onload = (ev) =>
                                setImagePreview(ev.target.result);
                              reader.readAsDataURL(file);
                            } else {
                              setImagePreview(null);
                              setImageName("");
                            }
                          }}
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-block cursor-pointer px-4 py-2 bg-[#075e54] text-white rounded-lg font-medium hover:bg-[#0b7b6b] transition-colors"
                        >
                          Choose Image
                        </label>
                        {imageName && (
                          <span className="ml-3 text-xs text-gray-500 truncate max-w-[180px] align-middle inline-block">
                            {imageName}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Custom file input for document */}
                    {header === "document" && (
                      <div className="mt-2">
                        <input
                          id="document-upload"
                          type="file"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.txt"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setDocumentPreview(file);
                              setDocumentName(file.name);
                            } else {
                              setDocumentPreview(null);
                              setDocumentName("");
                            }
                          }}
                        />
                        <label
                          htmlFor="document-upload"
                          className="inline-block cursor-pointer px-4 py-2 bg-[#075e54] text-white rounded-lg font-medium hover:bg-[#0b7b6b] transition-colors"
                        >
                          Choose Document
                        </label>
                        {documentName && (
                          <span className="ml-3 text-xs text-gray-500 truncate max-w-[180px] align-middle inline-block">
                            {documentName}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Custom file input for video */}
                    {header === "video" && (
                      <div className="mt-2">
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setVideoName(file.name);
                              setVideoPreview(URL.createObjectURL(file));
                            } else {
                              setVideoPreview(null);
                              setVideoName("");
                            }
                          }}
                        />
                        <label
                          htmlFor="video-upload"
                          className="inline-block cursor-pointer px-4 py-2 bg-[#075e54] text-white rounded-lg font-medium hover:bg-[#0b7b6b] transition-colors"
                        >
                          Choose Video
                        </label>
                        {videoName && (
                          <span className="ml-3 text-xs text-gray-500 truncate max-w-[180px] align-middle inline-block">
                            {videoName}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center gap-1 text-sm font-medium mb-1">
                      <div className="flex items-center gap-1 text-sm font-medium mb-1">
                        Body <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Button size="icon" variant="ghost">
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Strikethrough className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Code2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <List className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2 gap-1"
                          onClick={() => setShowVariablesModal(true)}
                        >
                          <Database className="w-4 h-4 mr-1" /> Add Variables
                        </Button>
                        {/* Insert Variables Modal */}
                        {showVariablesModal && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                              <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
                                onClick={() => setShowVariablesModal(false)}
                                aria-label="Close"
                              >
                                &times;
                              </button>
                              <div className="text-xl font-semibold mb-2">
                                Insert Variables
                              </div>
                              <div className="text-gray-500 mb-4 text-sm">
                                Select Variables to display in the template
                                content.
                              </div>

                              <div className="flex flex-wrap gap-2 justify-center">
                                {variables.map((v, i) => (
                                  <button
                                    key={i}
                                    className="px-3 py-1 rounded-lg border text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium focus:outline-none"
                                    type="button"
                                  >
                                    {v}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <Textarea
                        ref={bodyTextareaRef}
                        placeholder="Type your message here"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="bg-gray-50 pr-16"
                        maxLength={1024}
                        rows={3}
                        onBlur={() => setTimeout(() => setShowEmojiPicker(false), 200)}
                      />
                      <div className="absolute right-4 bottom-2 flex items-center gap-2 text-gray-400 text-xs">
                        <button
                          type="button"
                          tabIndex={-1}
                          className="focus:outline-none"
                          onClick={() => setShowEmojiPicker((v) => !v)}
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                        <span>{body.length}/1024</span>
                      </div>
                      {showEmojiPicker && (
                        <div className="absolute right-0 bottom-8 z-50">
                          <Picker data={emojiData} onEmojiSelect={insertEmoji} theme="light" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-sm font-medium mb-1">
                      Footer <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Enter footer text"
                        value={footer}
                        onChange={(e) => setFooter(e.target.value.slice(0, 60))}
                        className="bg-gray-50 pr-12"
                        maxLength={60}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                        {footer.length}/60
                      </div>
                    </div>
                  </div>

                  {/* Phone Number Collection (Optional) */}
                  <div className="mb-4">
                    {showPhoneInput && (
                      <div className="space-y-3">
                        <div className="text-xs text-gray-500">
                          Add phone number collection to your template. Numbers will be validated and formatted automatically.
                        </div>
                        <div className="space-y-2">
                          <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="IN"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            className="phone-input"
                            style={{
                              '--PhoneInputCountryFlag-height': '1em',
                              '--PhoneInputCountrySelectArrow-color': '#6b7280',
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={validatePhoneNumber}
                              className="text-xs"
                            >
                              Validate Number
                            </Button>
                            {phoneNumber && isValidPhoneNumber(phoneNumber) && (
                              <span className="text-xs text-green-600 font-medium">
                                ✓ Valid ({phoneNumber})
                              </span>
                            )}
                            {phoneNumber && !isValidPhoneNumber(phoneNumber) && (
                              <span className="text-xs text-red-600 font-medium">
                                ✗ Invalid number
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        Buttons <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      {!showButtonCreator && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2" size="sm">
                              <Plus className="w-4 h-4" /> Add Button
                              {/* <ChevronDown className="w-4 h-4" /> */}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => {
                              setSelectedButtonType("Quick Reply");
                              setShowButtonCreator(true);
                            }}>
                              <div className="flex items-center gap-2 w-full min-w-0 cursor-pointer">
                                <MessageSquare className="w-4 h-4 flex-shrink-0" style={{ color: "#075e54" }} />
                                <span className="truncate">Quick Reply</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => {
                              setSelectedButtonType("Phone Number");
                              setShowButtonCreator(true);
                            }}>
                              <div className="flex items-center gap-2 w-full min-w-0 cursor-pointer">
                                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#075e54" }} />
                                <span className="truncate">Phone Number</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => {
                              setSelectedButtonType("Visit Website");
                              setShowButtonCreator(true);
                            }}>
                              <div className="flex items-center gap-2 w-full min-w-0 cursor-pointer">
                                <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: "#075e54" }} />
                                <span className="truncate">Visit Website</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Button Creator Row */}
                    {showButtonCreator && (
                      <div className="mb-4">
                        <div className="flex items-end justify-between gap-3">
                          {/* Conditional Fields based on Button Type */}
                          {selectedButtonType === "Quick Reply" && (
                            <div className="flex-1">
                              <label className="text-xs font-medium mb-1 block">Button Text</label>
                              <div className="relative">
                                <Input
                                  placeholder="Enter button text"
                                  value={newButtonText}
                                  onChange={(e) => setNewButtonText(e.target.value.slice(0, 25))}
                                  maxLength={25}
                                  className="bg-white pr-12"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                  {newButtonText.length}/25
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedButtonType === "Phone Number" && (
                            <>
                              <div className="flex-1">
                                <label className="text-xs font-medium mb-1 block">Phone Number</label>
                                <div className="relative">
                                  <PhoneInput
                                    placeholder="Enter phone number"
                                    defaultCountry="IN"
                                    value={buttonPhoneNumber}
                                    onChange={setButtonPhoneNumber}
                                    className="phone-input-small"
                                  />
                                  {buttonPhoneNumber && (
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                                      {isValidPhoneNumber(buttonPhoneNumber) ? (
                                        <span className="text-green-600">✓ Valid</span>
                                      ) : (
                                        <span className="text-red-600">✗ Invalid</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex-shrink-0 w-40">
                                <label className="text-xs font-medium mb-1 block">Button Text (Optional)</label>
                                <div className="relative">
                                  <Input
                                    placeholder="Call Now"
                                    value={newButtonText}
                                    onChange={(e) => setNewButtonText(e.target.value.slice(0, 25))}
                                    maxLength={25}
                                    className="bg-white pr-12"
                                  />
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                    {newButtonText.length}/25
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {selectedButtonType === "Visit Website" && (
                            <>
                              <div className="flex-shrink-0 w-40">
                                <label className="text-xs font-medium mb-1 block">Button Text</label>
                                <div className="relative">
                                  <Input
                                    placeholder="Visit Website"
                                    value={newButtonText}
                                    onChange={(e) => setNewButtonText(e.target.value.slice(0, 25))}
                                    maxLength={25}
                                    className="bg-white pr-12"
                                  />
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                    {newButtonText.length}/25
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <label className="text-xs font-medium mb-1 block">Website URL</label>
                                <div className="relative">
                                  <Input
                                    placeholder="https://example.com"
                                    value={buttonUrl}
                                    onChange={(e) => setButtonUrl(e.target.value.slice(0, 2048))}
                                    className="bg-white pr-20"
                                    maxLength={2048}
                                  />
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs flex items-center gap-2">
                                    {buttonUrl && (
                                      <span>
                                        {isValidUrl(buttonUrl) ? (
                                          <span className="text-green-600">✓ Valid</span>
                                        ) : (
                                          <span className="text-red-600">✗ Invalid</span>
                                        )}
                                      </span>
                                    )}
                                    <span className="text-gray-400">{buttonUrl.length}/2048</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              className="bg-[#075e54] hover:bg-[#0b7b6b]"
                              onClick={addButton}
                              disabled={
                                !selectedButtonType ||
                                (selectedButtonType === "Phone Number" && (!buttonPhoneNumber || !isValidPhoneNumber(buttonPhoneNumber))) ||
                                (selectedButtonType === "Visit Website" && (!buttonUrl.trim() || !isValidUrl(buttonUrl.trim()))) ||
                                (selectedButtonType === "Quick Reply" && !newButtonText.trim())
                              }
                            >
                              Add
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={resetButtonCreator}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Existing buttons */}
                    <div className="space-y-3 mb-4">
                      {quickReplyButtons.map((btn, index) => (
                        <div
                          key={index}
                          className="flex max-w-full items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {getButtonIcon(btn.type)}
                            <div className="flex-1">
                              <div className="font-medium text-sm">{btn.text}</div>
                              <div className="text-xs text-gray-500">
                                {btn.type}
                                {btn.phoneNumber && ` • ${btn.phoneNumber}`}
                                {btn.url && ` • ${btn.url}`}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setQuickReplyButtons(
                                quickReplyButtons.filter((_, i) => i !== index)
                              )
                            }
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Submit Template
                </Button>
              </div>
            </div>

            {/* Right: WhatsApp Preview */}
            <div className="w-[350px] min-w-[350px] max-w-[450px] bg-transparent flex flex-col items-center">
              <div
                className="rounded-xl overflow-hidden w-full min-h-[500px] h-[600px] flex flex-col border border-gray-200 "
                style={{
                  backgroundColor: "#ece5dd",
                  backgroundImage: `url('/AnimalVector.svg')`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "500px",
                  backgroundPosition: "center",
                }}
              >
                {/* Header */}
                <div className="bg-[#075e54] h-[76px] flex items-center px-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-lg">
                      Contact Name
                    </div>
                    <div className="text-green-100 text-base">online</div>
                  </div>
                  <div className="text-white">
                    <EllipsisVertical className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                {/* Message bubble */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="grow space-y-4 overflow-y-auto p-4">
                    <div className="ml-auto max-w-[80%]">
                      <div className="bg-[#dcf8c7] rounded-lg text-base text-gray-900 text-left shadow">
                        {/* Media Preview inside message bubble */}
                        {(header === "image" ||
                          header === "document" ||
                          header === "video") && (
                          <div className="p-2">
                            {header === "image" && imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            )}
                            {header === "image" && !imagePreview && (
                              <div className="flex justify-center items-center bg-gray-200 h-48 w-full text-gray-500 text-lg font-medium rounded-lg">
                                Image Preview
                              </div>
                            )}
                            {header === "document" && documentName && (
                              <div className="flex items-center gap-3 bg-gray-200 h-32 w-full rounded-lg px-8">
                                <img
                                  src={getDocumentIcon(documentName)}
                                  alt="Document"
                                  className="w-12 h-12 object-contain"
                                />
                                <span className="text-lg text-gray-700 font-medium truncate">
                                  {documentName}
                                </span>
                              </div>
                            )}
                            {header === "document" && !documentName && (
                              <div className="flex justify-center items-center bg-gray-200 h-32 w-full text-gray-500 text-lg font-medium rounded-lg">
                                Document Preview
                              </div>
                            )}
                            {header === "video" && videoPreview && (
                              <video
                                src={videoPreview}
                                controls
                                className="min-h-40 max-h-80 w-full rounded-lg object-cover"
                              />
                            )}
                            {header === "video" && !videoPreview && (
                              <div className="flex justify-center items-center bg-gray-200 h-32 min-w-[200px] w-full text-gray-500 text-lg font-medium rounded-lg">
                                Video Preview
                              </div>
                            )}
                          </div>
                        )}
                        {/* Preview message */}
                        {body && (
                          <span
                            className={`block px-4 break-words whitespace-pre-wrap${
                              header === "image" ||
                              header === "document" ||
                              header === "video"
                                ? " pt-1"
                                : " pt-3"
                            }`}
                          >
                            {body}
                          </span>
                        )}
                        {footer && (
                          <span className="block text-sm text-gray-500 opacity-50 mt-1 px-4 text-left break-words whitespace-pre-wrap">
                            {footer}
                          </span>
                        )}
                        <span
                          className={`block text-xs text-gray-500 mt-1 px-4 pb-2 text-right${
                            !body && !footer && header === "none" ? " pt-3" : ""
                          }`}
                        >
                          9:11 PM
                        </span>
                        {/* Quick Reply Buttons */}
                        {quickReplyButtons.length > 0 && (
                          <div className="border-t border-t-[#c5e7b0]space-y-1">
                            {quickReplyButtons.map((btn, index) => (
                              <div
                                key={index}
                                className={
                                  `flex justify-center items-center gap-2 text-sm px-2 py-3 text-center` +
                                  (index !== 0
                                    ? " border-t border-t-[#c5e7b0]"
                                    : "") +
                                  " cursor-pointer hover:bg-[#BEE3A8]"
                                }
                              >
                                {getButtonIcon(btn.type)}
                                <span
                                  className="truncate max-w-[120px] overflow-hidden whitespace-nowrap text-center font-medium text-lg"
                                  style={{ color: "#075e54" }}
                                >
                                  {btn.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Input bar fixed at bottom */}
                  <div className="bg-[#f7f7f7] px-4 py-3 flex items-center gap-2 border-t mt-auto">
                    <button
                      type="button"
                      className="p-0 bg-transparent text-gray-500 border-0 outline-none flex items-center justify-center"
                    >
                      <Paperclip className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                      <div className="bg-white rounded-full px-4 py-2 text-gray-500 text-md">
                        Type a message
                      </div>
                    </div>
                    <button
                      type="button"
                      className="p-0 bg-transparent text-gray-500 border-0 outline-none flex items-center justify-center"
                    >
                      <SendHorizontal className="w-6 h-6" />
                    </button>
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
