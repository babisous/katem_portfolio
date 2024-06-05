export interface Slide {
	id: string;
	image_url: string;
	text: string;
}

export interface Project {
	id: string;
	name: string;
	date: string;
	thumbnail_url: string;
	desc: string;
	slides: Slide[];
}
