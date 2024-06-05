"use client";

import { useState, useEffect } from "react";
import { getProjectSlider } from "../pages/api/data";
import styles from "./Slider.module.css";

interface SliderProps {
	projectId: number;
}

export default function Slider({ project }: { project: any }) {
	const [slides, setSlides] = useState<any[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const fetchSlides = async () => {
			const fetchedSlides = await getProjectSlider(project.id);
			setSlides(fetchedSlides ?? []);
		};

		fetchSlides();
	}, [project.id]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	return (
		<div className={styles.slider} onClick={(event) => event.stopPropagation()}>
			{slides.length > 0 && (
				<>
					<div className={styles.slidesContainer}>
						<button className={styles.buttonLeft} onClick={prevSlide}>
							&lt;
						</button>
						<img
							src={slides[currentSlide].image_url}
							alt={slides[currentSlide].caption}
							className={styles.image}
						/>
						<button className={styles.buttonRight} onClick={nextSlide}>
							&gt;
						</button>
					</div>
					<div className={styles.detailsMobile}>
						<div className={styles.controlsMobile}>
							<button className={styles.buttonLeftMobile} onClick={prevSlide}>
								&lt;
							</button>
							<div className={styles.slideIndexContainer}>
								<p className={styles.slideIndex}>
									{currentSlide + 1}/{slides.length}
								</p>
								<div className={styles.slideIcon}></div>
							</div>
							<button className={styles.buttonRightMobile} onClick={nextSlide}>
								&gt;
							</button>
						</div>
						<div className={styles.textContainer}>
							<h2 className={styles.title}>{project.name}</h2>
							<p className={styles.caption}>{slides[currentSlide].caption}</p>
						</div>

						<p className={styles.yearMobile}>{project.year} ⁑</p>
					</div>
					<div className={styles.details}>
						<div className={styles.textContainer}>
							<h2 className={styles.title}>{project.name}</h2>
							<p className={styles.caption}>{slides[currentSlide].caption}</p>
						</div>
						<p className={styles.year}>{project.year} ⁑</p>
						<div className={styles.slideIndexContainer}>
							<p className={styles.slideIndex}>
								{currentSlide + 1}/{slides.length}
							</p>
							<div className={styles.slideIcon}></div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
