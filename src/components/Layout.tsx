"use client";

// src/components/Layout.tsx
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import "../styles/globals.css";
import styles from "./Layout.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Importez usePathname

type LayoutProps = {
	children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const pathname = usePathname(); // Utilisez usePathname pour obtenir le chemin

	useEffect(() => {
		if (children) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [children]);

	const logoWidth = children ? 175 : 265;
	const logoHeight = children ? 50 : 76;

	return (
		<div className={`${styles.app} ${children ? styles["on-page"] : ""}`}>
			<div className={`${styles.header} ${children ? styles["on-page"] : ""}`}>
				<Link href="/">
					<Image
						className={styles.logo}
						src="/Logo_katem0.svg"
						alt="Logo"
						width={logoWidth}
						height={logoHeight}
					/>
				</Link>
			</div>
			<div
				className={`${styles.content} ${
					isVisible ? styles.visible : styles.hidden
				} ${pathname === "/" ? styles.reverse : ""}`} // Utilisez pathname ici
			>
				{children}
			</div>
			<div className={`${styles.footer} ${children ? styles["on-page"] : ""}`}>
				<Link className={styles.footerLink} href="/work">
					Work
				</Link>

				<p>⁑</p>

				<Link className={styles.footerLink} href="/about">
					About
				</Link>

				<p>⁑</p>

				<Link className={styles.footerLink} href="/contact">
					Contact
				</Link>
			</div>
		</div>
	);
};

export default Layout;
