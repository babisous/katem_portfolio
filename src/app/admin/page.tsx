// pages/dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProjectList from "../../components/ProjectList";
import ProjectForm from "../../components/ProjectForm";

interface Project {
	id: string;
}

const DashboardPage = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	const fetchProjects = async () => {
		const projectsCollectionRef = collection(firestore, "Projects");
		const data = await getDocs(projectsCollectionRef);
		setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			<ProjectForm onProjectAdd={fetchProjects} />
			<ProjectList projects={projects} onProjectDelete={fetchProjects} />
		</div>
	);
};

export default DashboardPage;
