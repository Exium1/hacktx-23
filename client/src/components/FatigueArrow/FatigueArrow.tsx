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
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M26.8571 30.8571C25.9104 30.8571 25.1428 30.0896 25.1428 29.1429C25.1428 28.1961 25.9104 27.4286 26.8571 27.4286L26.8571 30.8571ZM36 27.4286C36.9467 27.4286 37.7143 28.1961 37.7143 29.1428C37.7143 30.0896 36.9468 30.8571 36 30.8571L36 27.4286ZM37.7143 29.1428C37.7143 30.0896 36.9468 30.8571 36 30.8571C35.0532 30.8571 34.2857 30.0896 34.2857 29.1429L37.7143 29.1428ZM34.2857 20C34.2857 19.0532 35.0532 18.2857 36 18.2857C36.9467 18.2857 37.7143 19.0532 37.7143 20L34.2857 20ZM37.2122 27.9307C37.8816 28.6002 37.8816 29.6855 37.2122 30.355C36.5427 31.0245 35.4573 31.0245 34.7878 30.355L37.2122 27.9307ZM20 13.1429L18.7878 11.9307C19.4573 11.2612 20.5426 11.2612 21.2121 11.9307L20 13.1429ZM13.1428 20L14.3549 21.2121C13.6854 21.8816 12.6002 21.8816 11.9307 21.2121L13.1428 20ZM2.78781 12.0693C2.11832 11.3999 2.11832 10.3144 2.78781 9.64496C3.45729 8.9755 4.54255 8.9755 5.21204 9.64496L2.78781 12.0693ZM26.8571 27.4286L36 27.4286L36 30.8571L26.8571 30.8571L26.8571 27.4286ZM34.2857 29.1429L34.2857 20L37.7143 20L37.7143 29.1428L34.2857 29.1429ZM34.7878 30.355L18.7878 14.355L21.2121 11.9307L37.2122 27.9307L34.7878 30.355ZM21.2121 14.355L14.3549 21.2121L11.9307 18.7879L18.7878 11.9307L21.2121 14.355ZM11.9307 21.2121L2.78781 12.0693L5.21204 9.64496L14.3549 18.7879L11.9307 21.2121Z"
						fill="#A0C879"
					/>
				</svg>
			) : (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M26.8571 9.14286C25.9104 9.14286 25.1428 9.91041 25.1428 10.8571C25.1428 11.8039 25.9104 12.5714 26.8571 12.5714L26.8571 9.14286ZM36 12.5714C36.9468 12.5714 37.7143 11.8039 37.7143 10.8571C37.7143 9.9104 36.9468 9.14286 36 9.14286L36 12.5714ZM37.7143 10.8571C37.7143 9.9104 36.9468 9.14286 36 9.14286C35.0532 9.14286 34.2857 9.9104 34.2857 10.8571L37.7143 10.8571ZM34.2857 20C34.2857 20.9468 35.0532 21.7143 36 21.7143C36.9468 21.7143 37.7143 20.9467 37.7143 20L34.2857 20ZM37.2122 12.0693C37.8817 11.3998 37.8817 10.3145 37.2122 9.64503C36.5427 8.97555 35.4573 8.97555 34.7878 9.64503L37.2122 12.0693ZM20 26.8572L18.7879 28.0693C19.4574 28.7388 20.5426 28.7388 21.2121 28.0693L20 26.8572ZM13.1428 20L14.3549 18.7879C13.6855 18.1184 12.6002 18.1184 11.9307 18.7879L13.1428 20ZM2.78784 27.9307C2.11835 28.6002 2.11835 29.6856 2.78784 30.3551C3.45733 31.0245 4.54259 31.0245 5.21207 30.3551L2.78784 27.9307ZM26.8571 12.5714L36 12.5714L36 9.14286L26.8571 9.14286L26.8571 12.5714ZM34.2857 10.8571L34.2857 20L37.7143 20L37.7143 10.8571L34.2857 10.8571ZM34.7878 9.64503L18.7879 25.645L21.2121 28.0693L37.2122 12.0693L34.7878 9.64503ZM21.2121 25.645L14.3549 18.7879L11.9307 21.2121L18.7879 28.0693L21.2121 25.645ZM11.9307 18.7879L2.78784 27.9307L5.21207 30.3551L14.3549 21.2121L11.9307 18.7879Z"
						fill={color}
					/>
				</svg>
			)}
		</div>
	);
}

export default FatigueArrow;
