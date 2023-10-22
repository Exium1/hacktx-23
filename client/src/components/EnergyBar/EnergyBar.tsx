import "./EnergyBar.scss"

function EnergyBar({energy}: {energy: number}) {
    let color = "";

    if (energy <= 10) {
        color = "#B93030";
    } else if (energy <= 25) {
        color = "#EB5757";
    } else if (energy <= 50) {
        color = "#F8845F";
    } else if (energy <= 75) {
        color = "#F8C45F";
    } else color = "#A0C879";

    return (
        <div className="energy-bar-wrapper">
            <div className="energy-bar">
                <div className="energy-bar-fill" style={{width: `${energy}%`, backgroundColor: color}}></div>
            </div>
        </div>
    )
}

export default EnergyBar;