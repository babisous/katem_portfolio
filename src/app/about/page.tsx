import React from "react";
import styles from "./page.module.css";
export default function About() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<p>
					Salut, moi c'est Thibault Grall (a.k.a Katem), designer graphique
					passionné. Aventurier du design en général, j'explore et m'essaye à
					tout type de création. Dans ce portfolio, vous découvrirez différents
					projets issus de divers domaines. La plupart sont des créations
					personnelles, mais vous trouverez également des travaux professionnels
					et scolaires.
				</p>
				<p>
					<strong>
						<br />
						Je suis actuellement à la recherche d'une alternance en design
						graphique pour ma première année de Mastère !
					</strong>
				</p>
			</div>
		</div>
	);
}
