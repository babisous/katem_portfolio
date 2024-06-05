"use client";

import React, { useState, useRef, useEffect } from "react";
import { getProjects } from "../../pages/api/data"; // Assurez-vous que le chemin d'importation est correct
import styles from "./styles.module.css";
import { Layout } from "../../components/Layout";
import Slider from "../../components/Slider";

const GridComponent = () => {
	const [expanded, setExpanded] = useState<number | null>(null);
	const [projects, setProjects] = useState<any[]>([]);
	const [visibleProjects, setVisibleProjects] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			const fetchedProjects = await getProjects();
			setProjects(fetchedProjects ?? []);
		};

		fetchProjects();
	}, []);

	useEffect(() => {
		if (projects.length > 0) {
			const interval = setInterval(() => {
				setVisibleProjects((prev) => {
					if (prev < projects.length) {
						return prev + 1;
					} else {
						clearInterval(interval);
						return prev;
					}
				});
			}, 100); // Délai de 300ms entre chaque apparition
			return () => clearInterval(interval);
		}
	}, [projects]);

	const handleExpand = (index: number) => {
		if (index !== expanded) {
			setProjects((prevProjects) => {
				const projectToExpand = prevProjects[index];
				const remainingProjects = prevProjects.filter((_, i) => i !== index);
				return [projectToExpand, ...remainingProjects];
			});
			setExpanded(0);
		} else {
			setExpanded(null);
		}

		setTimeout(() => {
			document.getElementById(`block-0`)?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}, 200);
	};

	return (
		<div ref={containerRef} className={styles.gridContainer}>
			{projects.slice(0, visibleProjects).map((project, index) => (
				<div
					key={project.id}
					id={`block-${index}`}
					className={`${styles.gridItem} ${
						expanded === index ? styles.expanded : ""
					}`}
					onClick={() => handleExpand(index)}
					style={{ backgroundImage: `url(${project.thumbnail_url})` }}
				>
					{expanded === index ? (
						<Slider project={project} />
					) : (
						<div className={styles.detailsContainer}>
							<h2 className={styles.title}>{project.name}</h2>
							<p className={styles.desc}>{project.description}</p>
							<p className={styles.year}>{project.year}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default GridComponent;
