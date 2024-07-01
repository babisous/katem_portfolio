import { useState } from "react";
import styles from "./page.module.css";

export default function Contact() {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				Contactez-moi à{" "}
				<a className={styles.link} href="mailto:grall.thib@gmail.com">
					grall.thib@gmail.com,
				</a>{" "}
				<br /> sur Instagram{" "}
				<a
					className={styles.link}
					href="https://www.instagram.com/katem.boi/"
					target="_blank"
					rel="noopener noreferrer"
				>
					@katem.boi
				</a>
				<div className={styles.row}>
					<p>ou par téléphone au </p>
					<a className={styles.link} href="tel:+33603760464">
						06 03 76 04 64
					</a>
				</div>
			</p>
		</div>
	);
}
