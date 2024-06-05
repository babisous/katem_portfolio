import React from "react";
import styles from "./page.module.css";
export default function About() {
	return (
		<div className={styles.container}>
			<img className={styles.image} src="/images/about.png" alt="about" />
			<div className={styles.text}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
					mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
					mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
					tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
					suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
					maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
					sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
					placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
					Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
					mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
					tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
					suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
					maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
					sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
					placerat. In iaculis arcu eros, eget tempus orci facilisis id.
				</p>
			</div>
		</div>
	);
}
