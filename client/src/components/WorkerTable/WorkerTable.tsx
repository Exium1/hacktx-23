import "./WorkerTable.scss";
import { useState, useReducer, useEffect } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table";
import EnergyBar from "../EnergyBar/EnergyBar";
import FatigueArrow from "../FatigueArrow/FatigueArrow";
import { useNavigate } from "react-router-dom";
import { getEnergy, getWorkers } from "../../api/database";

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

const columnHelper = createColumnHelper<Worker>();

const columns = [
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => (
			<div className="col-name">
				<img src={`/${info.row.original.profilePic}`} />
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
		cell: (info) => {
			const energy = (info.getValue() * 100).toFixed(0);
			return (
				<>
					<p>{energy}%</p>
					<EnergyBar energy={energy} />
				</>
			);
		}
	}),
	columnHelper.accessor("fatigueRate", {
		header: "Fatigue Rate",
		cell: (info) => (
			<div className="flex flex-row items-center justify-between max-w-[70px]">
				<p>{(info.getValue() * 100).toFixed(0)}%</p>
				<FatigueArrow fatigueRate={info.getValue()} />
			</div>
		)
	}),
	columnHelper.accessor("timeRemaining", {
		header: "Time Remaining",
		cell: (info) => {
			const mins = info.getValue();

			return (
				<>
					<p>
						{Math.floor(mins / 60)}:
						{mins % 60 < 10 ? `0${mins % 60}` : mins % 60}
					</p>
					<p className="cell-desc">
						{Math.ceil(info.row.original.shiftLength / 60)} hr shift
					</p>
				</>
			);
		}
	})
];

function WorkerTable() {
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const rerender = useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	useEffect(() => {
		console.log("useEffect");
		getWorkers().then((res: any) => {
			console.log("recieved data!");

			res.forEach(async (worker : any) => (worker.energy = await getEnergy(worker)));

			console.log(res);
			setData(res);
		});
	}, []);

	const update = () => {
		console.log("update");
		getWorkers().then((res) => {
			console.log("recieved data!");

			res.forEach((worker) => (worker.energy = getEnergy(worker.id)));

			console.log(res);
			setData(res);
			rerender();
		});
	};

	const onClick = (id: string) => {
		navigate(`./worker/${id}`);
	};

	return (
		<div className="worker-table">
			<div className="worker-table-header">
				<h1>Live Worker Data</h1>
				<div>
					<input type="text" placeholder="Search" />
					<button>
						Filter
						<img src="/filter.svg" />
					</button>
				</div>
			</div>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							onClick={() => onClick(row.original.id)}
						>
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
			{/* <button onClick={() => update()}>Rerender</button> */}
		</div>
	);
}

export default WorkerTable;
