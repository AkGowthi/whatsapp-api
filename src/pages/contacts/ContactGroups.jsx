
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SlidersHorizontal, Search, Pencil, Trash2 } from "lucide-react";

const groups = [
	{ id: 1, name: "Clients" },
	{ id: 2, name: "Vendors" },
];

export default function ContactGroups() {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState([]);

	const filteredGroups = groups.filter(g =>
		g.name.toLowerCase().includes(search.toLowerCase())
	);

	const handleSelectAll = (checked) => {
		if (checked) {
			setSelected(filteredGroups.map(g => g.id));
		} else {
			setSelected([]);
		}
	};

	const handleSelect = (id) => {
		setSelected(prev =>
			prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
		);
	};

	const allChecked = filteredGroups.length > 0 && filteredGroups.every(g => selected.includes(g.id));
	const someChecked = selected.length > 0 && !allChecked;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="min-h-screen bg-gray-50">
				<div className="flex flex-col w-full bg-gray-50 p-6">
					<h1 className="text-2xl font-bold mb-4">Contact Groups</h1>
					<div className="flex flex-row items-center gap-4 mb-6">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input
								placeholder="Search groups..."
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="pl-10 w-80 rounded-lg bg-white border-gray-200 text-base"
							/>
						</div>
						<div className="flex gap-2 ml-auto">
							<Button variant="outline" className="flex items-center gap-2 font-medium"><SlidersHorizontal className="w-4 h-4" /> View</Button>
							<Button variant="outline" className="font-medium">Contacts</Button>
							<Button className="bg-black text-white font-medium hover:bg-gray-800">Add Group</Button>
						</div>
					</div>
					<div className="bg-white rounded-lg border overflow-x-auto">
						<table className="min-w-full text-left">
							<thead>
								<tr className="text-xs font-semibold text-gray-700 bg-gray-50 border-b rounded-t-lg">
									<th className="px-3 py-2 w-10 rounded-tl-lg">
										<input
											type="checkbox"
											checked={allChecked}
											ref={el => { if (el) el.indeterminate = someChecked; }}
											onChange={e => handleSelectAll(e.target.checked)}
										/>
									</th>
									<th className="px-3 py-2">Name <span className="align-middle">⇅</span></th>
									<th className="px-3 py-2 w-20 rounded-tr-lg"></th>
								</tr>
							</thead>
							<tbody className="text-[15px] text-gray-900 font-normal">
								{filteredGroups.map((g) => (
										<tr key={g.id} className="border-b last:border-0 hover:bg-gray-50 even-row-height">
										<td className="px-3 py-2 align-middle">
											<input
												type="checkbox"
												checked={selected.includes(g.id)}
												onChange={() => handleSelect(g.id)}
											/>
										</td>
										<td className="px-3 py-2 align-middle whitespace-nowrap font-medium">{g.name}</td>
										<td className="px-3 py-2 align-middle text-right flex gap-2 justify-end">
											<Button variant="ghost" size="icon" className="w-8 h-8"><Pencil className="w-4 h-4" /></Button>
											<Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 className="w-4 h-4" /></Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
						<span>{selected.length} of {filteredGroups.length} row(s) selected.</span>
						<div className="flex items-center gap-2">
							<span>Rows per page</span>
							<select className="border rounded-lg px-2 py-1 text-sm">
								<option>10</option>
							</select>
							<span>Page 1 of 1</span>
							<Button variant="ghost" size="icon" className="w-8 h-8"><ChevronsLeft className="w-4 h-4" /></Button>
							<Button variant="ghost" size="icon" className="w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
							<Button variant="ghost" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
							<Button variant="ghost" size="icon" className="w-8 h-8"><ChevronsRight className="w-4 h-4" /></Button>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
