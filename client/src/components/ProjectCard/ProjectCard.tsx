import "./ProjectCard.scss";

function ProjectCard({
	name,
	address,
	date,
	id
}: {
	name: string;
	address: string;
	date: string;
	id: string;
}) {
	return (
		<div className="project-card">
			<img src={`project_${id}.jpg`} className="project-img"/>
			<div className="project-content">
				<div className="project-desc">
					<h1>{name}</h1>
					<p>{address}</p>
				</div>
				<div className="project-footer">
					<p>{date}</p>
					<div className="project-buttons">
						<a href={`/projects/${id}/edit`}><img src="./edit.svg" alt=""/></a>
						<a href={`/projects/${id}`}>Visit</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;
