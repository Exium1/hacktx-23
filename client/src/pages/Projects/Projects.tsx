import "./Projects.scss";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const projectsData = [
	{
		name: "Union on 24th",
		address: "701 W 24th St, Austin, TX 78705",
		date: "Jan 2019",
		id: "EF3858"
	},
    {
		name: "Rambler Apartments",
		address: "2513 Seton Ave, Austin, TX 78705",
		date: "Aug 2022",
		id: "RB5280"
	}
];

function Projects() {
	return (
		<div className="container projects-section">
			<h1>Projects</h1>
			<div className="projects-cards-container">
				{projectsData.map((project) => (
					<ProjectCard {...project} />
				))}
			</div>
		</div>
	);
}

export default Projects;
