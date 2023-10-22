import "./Overview.scss";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Overview() {
	return (
		<div className="overview-section">
			<h1>Overview</h1>
			<div className="overview-charts-container">
                <div className="overview-chart">
                    <h2>General</h2>
                    <div>
                        <h3>Temperature</h3>
                        <p>92 °C</p>
                    </div>
                    <div>
                    <h3>Avg Shift Length</h3>
                    <p>8.2 hours</p>
                    </div>
                </div>
				<div className="overview-chart">
					<h2>Energy Levels</h2>
                    <EnergyLevelsChart />
				</div>
                <div className="overview-chart">
                    <h2>Fatigue Rates</h2>
                    <FatigueRatesChart />
                </div>
			</div>
		</div>
	);
}

export default Overview;

const energyLevelsData = [
	{ name: "Critical", value: 1 },
	{ name: "Caution", value: 2 },
	{ name: "Well", value: 3 }
];

const COLORS = ["#FF6161", "#FFB661", "#A0C879"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${energyLevelsData[index].value}`}
		</text>
	);
};

function EnergyLevelsChart() {
	return (
		<PieChart width={200} height={200}>
			<Pie
				data={energyLevelsData}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={renderCustomizedLabel}
				outerRadius={100}
				fill="#8884d8"
				dataKey="value"
			>
				{energyLevelsData.map((entry, index) => (
					<Cell
						key={`cell-${index}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>
			<Tooltip />
		</PieChart>
	);
}

const fatigueRatesDate = [
	{ name: "Spiking", value: 1 },
	{ name: "Increasing", value: 2 },
	{ name: "Decreasing", value: 2 },
	{ name: "Resting", value: 3 },
];

const COLORS_fatigueRate = ["#B93030", "#FF6161", "#FFB661", "#A0C879"];

const renderCustomizedLabel_fatigueRates = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${fatigueRatesDate[index].value}`}
		</text>
	);
};

function FatigueRatesChart() {
	return (
		<PieChart width={200} height={200}>
			<Pie
				data={fatigueRatesDate}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={renderCustomizedLabel_fatigueRates}
				outerRadius={100}
				fill="#8884d8"
				dataKey="value"
			>
				{fatigueRatesDate.map((entry, index) => (
					<Cell
						key={`cell-${index}`}
						fill={COLORS_fatigueRate[index % COLORS_fatigueRate.length]}
					/>
				))}
			</Pie>
			<Tooltip />
		</PieChart>
	);
}
