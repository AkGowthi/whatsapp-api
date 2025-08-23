import { useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Authentication() {
  const [authDelivery, setAuthDelivery] = useState("copy");
  const [authSecurity, setAuthSecurity] = useState(false);
  const [authExpiry, setAuthExpiry] = useState(false);
  const [expiryMinutes, setExpiryMinutes] = useState(2);
  const [authButtonText, setAuthButtonText] = useState("Copy code");
  const [autofillButtonText, setAutofillButtonText] = useState("Autofill");
  // App setup state for one-tap autofill
  const [apps, setApps] = useState([
    { packageName: "", signatureHash: "" }
  ]);

  const handleAppChange = (idx, field, value) => {
    setApps((prev) => prev.map((app, i) => i === idx ? { ...app, [field]: value } : app));
  };

  const handleAddApp = () => {
    if (apps.length < 5) {
      setApps((prev) => [...prev, { packageName: "", signatureHash: "" }]);
    }
  };

  const handleRemoveApp = (idx) => {
    setApps((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      {/* Code delivery setup */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="font-semibold mb-4 flex items-center gap-2">
          Code delivery setup
        </div>
        <div className="flex flex-col gap-6">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="authDelivery"
              checked={authDelivery === "copy"}
              onChange={() => setAuthDelivery("copy")}
              className="mt-1"
            />
            <div>
              <div className="font-medium">
                Copy code{" "}
                <Info className="inline w-4 h-4 text-gray-400 ml-1 align-middle" />
              </div>
              <div className="text-gray-500 text-sm">
                Basic authentication with quick setup. Your customers copy and
                paste the code into your app.
              </div>
            </div>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="authDelivery"
              checked={authDelivery === "zero"}
              onChange={() => setAuthDelivery("zero")}
              className="mt-1"
            />
            <div>
              <div className="font-medium">
                Zero-tap autofill{" "}
                <Info className="inline w-4 h-4 text-gray-400 ml-1 align-middle" />
              </div>
              <div className="text-gray-500 text-sm">
                This is recommended as the easiest option for your customers.
                Zero-tap will automatically send code without requiring your
                customer to tap a button. An autofill or copy code message will
                be sent if zero-tap and autofill aren't possible.
              </div>
              {/* Zero-tap autofill additional content */}
              {authDelivery === "zero" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <div className="text-sm">
                      <span className="text-gray-700">
                        By selecting zero-tap, I understand that Test WhatsApp
                        Business Account's use of zero-tap authentication is
                        subject to the{" "}
                      </span>
                      <a href="#" className="text-blue-600 hover:underline">
                        WhatsApp Business Terms of Service
                      </a>
                      <span className="text-gray-700">.</span>
                    </div>
                  </label>

                  <div className="mt-4 text-sm text-gray-700">
                    It's Test WhatsApp Business Account's responsibility to
                    ensure its customers expect that the code will be
                    automatically filled-in on their behalf when they choose to
                    receive the zero-tap code through WhatsApp.
                  </div>

                  <div className="mt-3">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Learn more and review best practices.
                    </a>
                  </div>
                </div>
              )}
            </div>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="authDelivery"
              checked={authDelivery === "one"}
              onChange={() => setAuthDelivery("one")}
              className="mt-1"
            />
            <div>
              <div className="font-medium">
                One-tap autofill{" "}
                <Info className="inline w-4 h-4 text-gray-400 ml-1 align-middle" />
              </div>
              <div className="text-gray-500 text-sm">
                The code sends to your app when customers tap the button. A copy
                code message will be sent if autofill isn't possible.
              </div>
            </div>
          </label>
        </div>
      </div>

          {/* One-tap autofill additional content */}
          {authDelivery === "one" && (
            <div className="mt-8">
              <div className="bg-white rounded-xl border p-6 mb-6">
                <div className="font-semibold mb-2 text-lg">App setup</div>
                <div className="mb-4 text-gray-600 text-sm">You can add up to 5 apps.</div>
                <div className="flex flex-col gap-2 mb-2">
                  {apps.map((app, idx) => (
                    <div className="flex flex-row gap-4" key={idx}>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Package name</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter text (com.example.myapplication)"
                            maxLength={224}
                            value={app.packageName}
                            onChange={e => handleAppChange(idx, 'packageName', e.target.value.slice(0, 224))}
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-14"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 pointer-events-none">
                            {app.packageName.length}/224
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">App signature hash</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter text"
                            maxLength={11}
                            value={app.signatureHash}
                            onChange={e => handleAppChange(idx, 'signatureHash', e.target.value.slice(0, 11))}
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-12"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 pointer-events-none">
                            {app.signatureHash.length}/11
                          </div>
                        </div>
                      </div>
                      {apps.length > 1 && (
                        <button type="button" onClick={() => handleRemoveApp(idx)} className="self-end mb-1 ml-2 text-gray-400 hover:text-red-500" title="Remove app" style={{height:'32px'}}>
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {apps.length < 5 && (
                  <button type="button" onClick={handleAddApp} className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mt-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    + Add App
                  </button>
                )}
                <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-2 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-5 h-5 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9V6.75a.75.75 0 011.5 0V9a.75.75 0 01-1.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-blue-700 text-sm">
                    It is recommended to only include different builds of the same app (which would not coexist on a production user's phone), rather than entirely different apps.
                  </span>
                </div>
              </div>
            </div>
          )}

      {/* Content */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="font-semibold mb-4 flex items-center gap-2">
          Content
        </div>
        <div className="text-gray-500 mb-4 text-sm">
          Content for authentication message templates can't be edited. You can
          add additional content from the options below.
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={authSecurity}
              onChange={(e) => setAuthSecurity(e.target.checked)}
            />
            <span>Add security recommendation</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={authExpiry}
              onChange={(e) => setAuthExpiry(e.target.checked)}
            />
            <span>Add expiration time for the code</span>
          </label>
          <div className="text-xs text-gray-500 ml-5">
            After the code expires, the autofill button will be disabled.
          </div>
          {authExpiry && (
            <div className="flex flex-col items-start gap-2 mt-2 ml-5">
              <label className="text-sm font-medium justify-start" htmlFor="expiry-minutes">Expires in</label>
              <div className="flex items-center gap-2">
              <input
                id="expiry-minutes"
                type="number"
                min={1}
                max={60}
                value={expiryMinutes}
                onChange={e => setExpiryMinutes(Math.max(1, Math.min(60, Number(e.target.value))))}
                className="border rounded-lg px-3 py-1 w-24 text-base text-start focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              />
              <span className="text-base text-gray-700">minutes</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="font-semibold mb-4 flex items-center gap-2">
          Buttons
        </div>
        <div className="mb-2 text-sm text-gray-600">
          You can customize the button text for both autofill and copy code.
          Even when zero-tap is turned on, buttons are still needed for the
          backup code delivery method.
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col mt-2 gap-2">
          <label className="text-sm font-medium mb-1">Copy code</label>
          <div className="relative w-full">
            <Input
              value={authButtonText}
              onChange={(e) => setAuthButtonText(e.target.value.slice(0, 25))}
              maxLength={25}
              className="w-full pr-14"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 pointer-events-none">
              {authButtonText.length}/25
            </span>
          </div>
          </div>

          {(authDelivery === "zero" || authDelivery === "one") && (
            <>
            <div className="flex flex-col mt-2 gap-2">
              <label className="text-sm font-medium mb-1">Autofill button text</label>
              <div className="relative w-full">
                <Input
                  value={autofillButtonText}
                  onChange={(e) => setAutofillButtonText(e.target.value.slice(0, 25))}
                  maxLength={25}
                  className="w-full pr-14"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1 pointer-events-none">
                  {autofillButtonText.length}/25
                </span>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
