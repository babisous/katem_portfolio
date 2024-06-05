import React, { useState } from "react";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "../app/firebaseConfig";

const ProjectList = ({ projects, onProjectDelete }) => {
	const [showAddSlideForm, setShowAddSlideForm] = useState(false);
	const [currentProjectId, setCurrentProjectId] = useState("");
	const [slideData, setSlideData] = useState({ image_url: "", text: "" });
	const [slides, setSlides] = useState({});
	const [currentSlideEditing, setCurrentSlideEditing] = useState(null);
	const [editSlideData, setEditSlideData] = useState({
		image_url: "",
		text: "",
	});
	const [currentProjectIdEditing, setCurrentProjectIdEditing] = useState(null);
	const [updatedProjectData, setUpdatedProjectData] = useState({
		name: "",
		desc: "",
		date: "",
		thumbnail_url: "",
	});

	const handleAddSlide = async (projectId) => {
		if (!projectId) return;
		const projectRef = doc(firestore, "Projects", projectId);
		const slidesCollectionRef = collection(projectRef, "Slides");
		await addDoc(slidesCollectionRef, slideData);
		// Réinitialiser le formulaire et masquer
		setSlideData({ image_url: "", text: "" });
		setShowAddSlideForm(false);
		// Optionnel : Mettre à jour l'UI ou notifier l'utilisateur du succès
		fetchSlides(projectId); // Refresh slides list after adding
	};

	const fetchSlides = async (projectId) => {
		const slidesCollectionRef = collection(
			firestore,
			"Projects",
			projectId,
			"Slides"
		);
		const slideDocs = await getDocs(slidesCollectionRef);
		const slidesData = slideDocs.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setSlides((prevSlides) => ({ ...prevSlides, [projectId]: slidesData }));
		console.log(slidesData);
	};

	const handleUpdateSlide = async (projectId, slideId) => {
		const slideRef = doc(firestore, "Projects", projectId, "slides", slideId);
		await updateDoc(slideRef, editSlideData);
		setCurrentSlideEditing(null);
		// Refresh slides
		fetchSlides(projectId);
	};

	const handleDeleteSlide = async (projectId, slideId) => {
		const slideRef = doc(firestore, "Projects", projectId, "slides", slideId);
		await deleteDoc(slideRef);
		// Refresh slides
		fetchSlides(projectId);
	};

	const handleEditClick = (project) => {
		setCurrentProjectId(project.id);
		setShowAddSlideForm(true);
		onProjectDelete();
	};

	const handleDelete = (projectId) => {
		const projectRef = doc(firestore, "Projects", projectId);
		deleteDoc(projectRef);
		onProjectDelete();
	};

	const handleUpdateProject = async (projectId) => {
		const projectRef = doc(firestore, "Projects", projectId);
		await updateDoc(projectRef, updatedProjectData);
		setCurrentProjectIdEditing(null); // Fermer le formulaire de mise à jour
		onProjectDelete();
	};

	return (
		<div>
			<h2>Projects</h2>
			{projects.map((project) => (
				<div key={project.id}>
					<h3>{project.name}</h3>
					{currentProjectIdEditing === project.id ? (
						<div>
							<input
								type="text"
								placeholder="Nouveau nom"
								value={updatedProjectData.name}
								onChange={(e) =>
									setUpdatedProjectData({
										...updatedProjectData,
										name: e.target.value,
									})
								}
							/>
							<input
								type="text"
								placeholder="Nouvelle description"
								value={updatedProjectData.desc}
								onChange={(e) =>
									setUpdatedProjectData({
										...updatedProjectData,
										desc: e.target.value,
									})
								}
							/>
							<input
								type="text"
								placeholder="Nouvelle date"
								value={updatedProjectData.date}
								onChange={(e) =>
									setUpdatedProjectData({
										...updatedProjectData,
										date: e.target.value,
									})
								}
							/>
							<input
								type="text"
								placeholder="Nouvelle URL de vignette"
								value={updatedProjectData.thumbnail_url}
								onChange={(e) =>
									setUpdatedProjectData({
										...updatedProjectData,
										thumbnail_url: e.target.value,
									})
								}
							/>
							<button onClick={() => handleUpdateProject(project.id)}>
								Sauvegarder
							</button>
						</div>
					) : (
						<button
							onClick={() => {
								setCurrentProjectIdEditing(project.id);
								setUpdatedProjectData({
									name: project.name,
									desc: project.desc,
									thumbnail_url: project.thumbnail_url,
									date: project.date,
								});
							}}
						>
							Modifier
						</button>
					)}
					<button onClick={() => handleDelete(project.id)}>Supprimer</button>
					<button
						onClick={() => {
							setCurrentProjectId(project.id);
							setShowAddSlideForm(true);
						}}
					>
						Ajouter une slide
					</button>
					{showAddSlideForm && currentProjectId === project.id && (
						<div>
							<input
								type="text"
								placeholder="URL de l'image"
								value={slideData.image_url}
								onChange={(e) =>
									setSlideData({ ...slideData, image_url: e.target.value })
								}
							/>
							<input
								type="text"
								placeholder="Texte de la slide"
								value={slideData.text}
								onChange={(e) =>
									setSlideData({ ...slideData, text: e.target.value })
								}
							/>
							<button onClick={() => handleAddSlide(project.id)}>
								Ajouter Slide
							</button>
						</div>
					)}
					<button onClick={() => fetchSlides(project.id)}>
						Voir les slides
					</button>
					{slides[project.id] &&
						slides[project.id].map((slide) => (
							<div key={slide.id}>
								{currentSlideEditing === slide.id ? (
									<div>
										<input
											type="text"
											value={editSlideData.image_url}
											onChange={(e) =>
												setEditSlideData({
													...editSlideData,
													image_url: e.target.value,
												})
											}
										/>
										<input
											type="text"
											value={editSlideData.text}
											onChange={(e) =>
												setEditSlideData({
													...editSlideData,
													text: e.target.value,
												})
											}
										/>
										<button
											onClick={() => handleUpdateSlide(project.id, slide.id)}
										>
											Sauvegarder
										</button>
									</div>
								) : (
									<div>
										<p>Image URL: {slide.image_url}</p>
										<p>Text: {slide.text}</p>
										<button
											onClick={() => {
												setCurrentSlideEditing(slide.id);
												setEditSlideData({
													image_url: slide.image_url,
													text: slide.text,
												});
											}}
										>
											Modifier
										</button>
										<button
											onClick={() => handleDeleteSlide(project.id, slide.id)}
										>
											Supprimer
										</button>
									</div>
								)}
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default ProjectList;
