import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Wallet() {
	const [search, setSearch] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [visibleColumns, setVisibleColumns] = useState({
		orderId: true,
		provider: true,
		amount: true,
		date: true,
		status: true,
	});

	const toggleColumn = (column) => {
		setVisibleColumns(prev => ({
			...prev,
			[column]: !prev[column]
		}));
	};
	
	return (
			<SidebarProvider>
				<AppSidebar />
							<SidebarInset className="min-h-screen bg-gray-50">
								<main className="p-6">
									<h1 className="text-2xl font-bold mb-4">Wallet</h1>
									{/* Wallet Balance Card */}
									<div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-start mb-8 border">
							<div className="text-2xl font-semibold mb-2">Wallet Balance</div>
							<div className="text-4xl font-bold mb-6">₹0.00</div>
							<button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors">Add Money</button>
						</div>

						{/* Recent Transactions */}
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-2xl font-semibold">Recent Transactions</h2>
						</div>
									<div className="flex items-center gap-4 mb-4">
										<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input
								placeholder="Search transactions.."
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="pl-10 w-80 rounded-lg bg-white border-gray-200 text-base"
							/>
						</div>
										<div className="flex gap-2 ml-auto">
											{/* View button for show/hide columns */}
											<DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
												<DropdownMenuTrigger asChild>
													<Button variant="outline" className="flex items-center gap-2 font-medium">
														<SlidersHorizontal className="w-4 h-4" />
														View
													</Button>
												</DropdownMenuTrigger>
																		<DropdownMenuContent align="end" className="max-w-full p-0">
																			<div className="pl-4 pr-8 pt-3 pb-2 border-b font-normal text-base">Toggle columns</div>
																			{[
																				{ key: 'orderId', label: 'ExternalId' },
																				{ key: 'provider', label: 'Provider' },
																				{ key: 'amount', label: 'Amount' },
																				{ key: 'date', label: 'CreatedAt' },
																				{ key: 'status', label: 'Status' },
																			].map((column) => (
																				<button
																					key={column.key}
																					onClick={() => toggleColumn(column.key)}
																					type="button"
																					className={`w-full flex items-center gap-2 px-2 py-2 text-base hover:bg-gray-100 focus:outline-none ${visibleColumns[column.key] ? '' : 'text-gray-400'}`}
																				>
																					<span className="w-5 flex items-center justify-center">
																						{visibleColumns[column.key] ? (
																							<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 10l4 4 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
																						) : null}
																					</span>
																					<span>{column.label}</span>
																				</button>
																			))}
																		</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>

						{/* Transactions Table - Contact Groups Style */}
						<div className="bg-white rounded-lg border overflow-x-auto">
							<table className="min-w-full text-left">
								<thead>
									<tr className="text-xs font-semibold text-gray-700 bg-gray-50 border-b rounded-t-lg">
										<th className="px-3 py-2 w-10 rounded-tl-lg">
											<input type="checkbox" disabled />
										</th>
										{visibleColumns.orderId && <th className="px-3 py-2">Order ID <span className="align-middle">⇅</span></th>}
										{visibleColumns.provider && <th className="px-3 py-2">Provider <span className="align-middle">⇅</span></th>}
										{visibleColumns.amount && <th className="px-3 py-2">Amount <span className="align-middle">⇅</span></th>}
										{visibleColumns.date && <th className="px-3 py-2">Date <span className="align-middle">⇅</span></th>}
										{visibleColumns.status && <th className="px-3 py-2">Status <span className="align-middle">⇅</span></th>}
										<th className="px-3 py-2 w-20 rounded-tr-lg">Actions</th>
									</tr>
								</thead>
								<tbody className="text-[15px] text-gray-900 font-normal">
									<tr className="border-b last:border-0 hover:bg-gray-50 even-row-height">
										<td className="px-3 py-2 align-middle">
											<input type="checkbox" disabled />
										</td>
										<td className="px-3 py-2 align-middle whitespace-nowrap font-medium" colSpan={Object.values(visibleColumns).filter(Boolean).length}>
											No results.
										</td>
										<td className="px-3 py-2 align-middle text-right flex gap-2 justify-end"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
							<span>0 of 0 row(s) selected.</span>
							<div className="flex items-center gap-2">
								<span>Rows per page</span>
								<select className="border rounded-lg px-2 py-1 text-sm">
									<option>10</option>
								</select>
								<span>Page 1 of 0</span>
								<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100" disabled>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
								</button>
								<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100" disabled>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7"/></svg>
								</button>
								<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100" disabled>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7"/></svg>
								</button>
								<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100" disabled>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 5l7 7-7 7"/></svg>
								</button>
							</div>
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		);
}
