import "./WorkerTable.scss";
import { useState, useReducer } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table";

type Worker = {
	name: string;
	profilePic: string;
	id: string;
	title: string;
	site: string;
	siteDetails: string;
	energy: number;
	fatigueRate: number;
	timeRemaining: number;
	shiftLength: number;
};

const testData: Worker[] = [
	{
		name: "John Doe",
		profilePic: "./empty-profile-blue.png",
		id: "6780-3265",
		title: "Electrician",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 76,
		fatigueRate: 42,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Jane Doe",
		profilePic: "./empty-profile-purple.png",
		id: "5404-7802",
		title: "Electrician",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 13,
		fatigueRate: 88,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Jimmy Dane",
		profilePic: "./empty-profile-red.png",
		id: "9028-3528",
		title: "Plumber",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 63,
		fatigueRate: -12,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Janis Joplin",
		profilePic: "./empty-profile-green.png",
		id: "9208-7358",
		title: "Equipment Operator",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 86,
		fatigueRate: -32,
		timeRemaining: 90,
		shiftLength: 8
	}
];

const columnHelper = createColumnHelper<Worker>();

const columns = [
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => (
			<div className="col-name">
				<img src={info.row.original.profilePic} />
				<div>
					<p>{info.getValue()}</p>
					<p className="cell-desc">{info.row.original.id}</p>
				</div>
			</div>
		)
	}),
	columnHelper.accessor("title", {
		header: "Title",
		cell: (info) => <p>{info.getValue()}</p>
	}),
	columnHelper.accessor("site", {
		header: "Site",
		cell: (info) => (
			<>
				<p>{info.getValue()}</p>
				<p className="cell-desc">{info.row.original.siteDetails}</p>
			</>
		)
	}),
	columnHelper.accessor("energy", {
		header: "Energy",
		cell: (info) => <p>{info.getValue()}%</p>
	}),
	columnHelper.accessor("fatigueRate", {
		header: "Fatigue Rate",
		cell: (info) => <p>{info.getValue()}%</p>
	}),
	columnHelper.accessor("timeRemaining", {
		header: "Time Remaining",
		cell: (info) => (
			<>
				<p>{info.getValue()}</p>
				<p className="cell-desc">{info.row.original.shiftLength}</p>
			</>
		)
	})
];

function WorkerTable() {
	const [data, setData] = useState(() => [...testData]);
	// const rerender = useReducer(() => ({}), {})[1];
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	return (
		<div className="worker-table">
			<div className="p-2">
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default WorkerTable;
