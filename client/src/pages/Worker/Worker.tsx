import { useParams } from "react-router-dom";
import "./Worker.scss";
import React, { PureComponent } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

const data01 = [
	{ x: 0, y: 100 },
	{ x: 2, y: 90 },
	{ x: 4, y: 50 },
	{ x: 6, y: 64 },
	{ x: 8, y: 20 },
];

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
		profilePic: "/empty-profile-blue.png",
		id: "6780-3265",
		title: "Electrician",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 100,
		fatigueRate: 42,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Jane Doe",
		profilePic: "/empty-profile-purple.png",
		id: "5404-7802",
		title: "Electrician",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 75,
		fatigueRate: 88,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Jimmy Dane",
		profilePic: "/empty-profile-red.png",
		id: "9028-3528",
		title: "Plumber",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 50,
		fatigueRate: -12,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Janis Joplin",
		profilePic: "/empty-profile-green.png",
		id: "9208-7358",
		title: "Equipment Operator",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 25,
		fatigueRate: 12,
		timeRemaining: 90,
		shiftLength: 8
	},
	{
		name: "Janis Joplin",
		profilePic: "/empty-profile-green.png",
		id: "9208-7358",
		title: "Equipment Operator",
		site: "Union on 24th",
		siteDetails: "Austin, TX",
		energy: 10,
		fatigueRate: -78,
		timeRemaining: 90,
		shiftLength: 8
	}
];

function Worker() {
	const { workerID } = useParams();
	const worker: Worker = testData.find((worker) => worker.id === workerID)!;

	return (
		<div className="container worker-section">
			<div className="worker-content">
				<img src={worker.profilePic} />
				<div className="worker-info">
					<h1>{worker.name}</h1>
					<p>{worker.id}</p>
				</div>
			</div>
			<div className="worker-chart">
                <h1>Energy Levels</h1>
				<ResponsiveContainer width="100%" height={400}>
					<ScatterChart
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 20
						}}
					>
						<CartesianGrid />
						<XAxis
							type="number"
							dataKey="x"
							name="stature"
							unit="h"
						/>
						<YAxis
							type="number"
							dataKey="y"
							name="weight"
							unit="kg"
						/>
						<ZAxis type="number" range={[100]} />
						<Tooltip cursor={{ strokeDasharray: "3 3" }} />
						<Legend />
						<Scatter
							name="Energy"
							data={data01}
							fill="#8884d8"
							line
							shape="diamond"
						/>
					</ScatterChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default Worker;
