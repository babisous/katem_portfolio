import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gxwtidtsstgvmhnnsfvw.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
	throw new Error("SUPABASE_KEY is not defined");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// data.js next ts 14 api
//Get projects from projects table
export const getProjects = async () => {
	const { data, error } = await supabase.from("projects").select("*");
	return data;
};

// Get sliders from sliders table by project_id
export const getProjectSlider = async (project_id: number) => {
	const { data, error } = await supabase
		.from("sliders")
		.select("*")
		.eq("project_id", project_id);
	return data;
};
