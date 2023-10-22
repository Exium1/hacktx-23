import "./FatigueArrow.scss";

function FatigueArrow({ fatigueRate }: { fatigueRate: number }) {
	let color = "";

	if (fatigueRate <= 0) {
		color = "#A0C879";
	} else if (fatigueRate <= 25) {
		color = "#F8C45F";
	} else if (fatigueRate <= 50) {
		color = "#F8845F";
	} else if (fatigueRate <= 75) {
		color = "#EB5757";
	} else color = "#B93030";

	return (
		<div>
			{fatigueRate <= 0 ? (
				fatigueRate <= -50 ? (
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.01316 2.82894L10 8.80482L15.9868 2.82894M4.01316 11.1952L10 17.1711L15.9868 11.1952"
							stroke={color}
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				) : (
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 7.00001L9.98684 12.9759L15.9737 7.00001"
							stroke={color}
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				)
			) : fatigueRate >= 50 ? (
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.9868 17.1711L10 11.1952L4.01316 17.1711M15.9868 8.80483L10 2.82895L4.01316 8.80483"
						stroke={color}
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			) : (
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.9737 13.4044L9.98684 7.42856L4 13.4044"
						stroke={color}
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			)}
		</div>
	);
}

export default FatigueArrow;
