// components/ProjectForm.tsx
import React, { useState } from "react";
import { firestore } from "../app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ProjectForm = ({ onProjectAdd }) => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [date, setDate] = useState("");
	const [thumbnail_url, setThumbnailUrl] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(firestore, "Projects"), {
				name,
				desc,
				date,
				thumbnail_url,
			});
			onProjectAdd(); // Appelle la fonction de mise à jour après l'ajout
			setName("");
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Project Name"
			/>
			<input
				type="text"
				value={desc}
				onChange={(e) => setDesc(e.target.value)}
				placeholder="Project Description"
			/>
			<input
				type="text"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				placeholder="Project Date"
			/>
			<input
				type="text"
				value={thumbnail_url}
				onChange={(e) => setThumbnailUrl(e.target.value)}
				placeholder="Thumbnail URL"
			/>
			<button type="submit">Add Project</button>
		</form>
	);
};

export default ProjectForm;
