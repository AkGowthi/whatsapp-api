import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Account() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="min-h-screen bg-gray-50">
				<main className="p-6">
					<h1 className="text-2xl font-bold mb-6">Account</h1>
					{/* WhatsApp Business Connected Banner */}
					<div className="rounded-2xl bg-green-100 border border-green-200 px-8 py-6 mb-8 flex items-center gap-4">
						<svg className="w-7 h-7 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#d1fadf"/><path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
						<div>
							<div className="text-lg font-semibold text-green-800">WhatsApp Business Connected</div>
							<div className="text-green-800">Your WhatsApp Business account is active and ready</div>
						</div>
					</div>
					{/* Account Details Card */}
					<div className="bg-white rounded-2xl shadow-sm border px-10 py-8 flex flex-col gap-8 max-w-5xl">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<div className="text-gray-500 text-base mb-1">Status</div>
								<div className="text-lg font-bold tracking-wide">ACTIVE</div>
							</div>
							<div>
								<div className="text-gray-500 text-base mb-1">Phone Number ID</div>
								<div className="text-lg font-bold tracking-wide">594192307106442</div>
							</div>
						</div>
						<div>
							<div className="text-xl font-bold mb-2">Business Profile</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<div className="text-gray-500 text-base mb-1">Business Name</div>
									<div className="text-lg font-semibold">Sports Wander</div>
								</div>
								<div>
									<div className="text-gray-500 text-base mb-1">Business ID</div>
									<div className="text-lg font-semibold">2036369680177131</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
