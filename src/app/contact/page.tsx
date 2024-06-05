import { useState } from "react";
import styles from "./page.module.css";

export default function Contact() {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				Contact me at{" "}
				<a className={styles.link} href="mailto:grall.thib@gmail.com">
					grall.thib@gmail.com
				</a>{" "}
				<br /> or on Instagram{" "}
				<a className={styles.link} href="">
					@katem.boi
				</a>
			</p>
		</div>
	);
}
