"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "../styles/globals.css";
import styles from "../components/Layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isVisible, setIsVisible] = useState(false);
	const pathname = usePathname();

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
		<html lang="en">
			<body className={inter.className}>
				<div
					className={`${styles.app} ${
						children && pathname !== "/" ? styles["on-page"] : ""
					}`}
				>
					<div className={styles.videoBackground}>
						<img src="/bg.gif" alt="Background GIF" className={styles.video} />
					</div>
					<div
						className={`${styles.header} ${
							children && pathname !== "/" ? styles["on-page"] : ""
						}`}
					>
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
						} ${pathname === "/" ? styles.hidden : ""}`}
					>
						{children}
					</div>
					<div
						className={`${styles.footer} ${
							children && pathname !== "/" ? styles["on-page"] : ""
						}`}
					>
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
			</body>
		</html>
	);
}
