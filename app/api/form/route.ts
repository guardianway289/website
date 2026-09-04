import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { validateContactForm } from "@/app/lib/validations/form";

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
	}

	const validation = validateContactForm(body);

	if (!validation.success) {
		return NextResponse.json(
			{
				error: "Validation failed. Please check your form inputs.",
				details: validation.errors,
			},
			{ status: 400 },
		);
	}

	const data = validation.data;

	if (data.role === "parent") {
		const { error } = await supabase.from("parent_submissions").insert({
			name: data.name,
			phone: data.phone,
			email: data.email || null,
			school: data.school,
			locality: data.locality,
			distance: data.distance,
			transport: data.transport,
			travel_hours: data.travelHours,
			travel_minutes: data.travelMinutes,
			monthly_cost: data.monthlyCost,
			child_grade: data.childGrade || null,
			matters: data.matters || [],
			timeline: data.timeline,
			call_time: data.callTime,
		});

		if (error) {
			console.error("Parent submission insert failed", error);
			return NextResponse.json({ error: "Unable to save parent enquiry." }, { status: 500 });
		}
	} else {
		const { error } = await supabase.from("institute_submissions").insert({
			name: data.name,
			phone: data.phone,
			email: data.email,
			organization: data.organization,
			designation: data.designation,
			location: data.location,
			student_count: data.studentCount,
			setup: data.setup,
			timeline: data.timeline,
			call_time: data.callTime,
		});

		if (error) {
			console.error("Institute submission insert failed", error);
			return NextResponse.json({ error: "Unable to save institution enquiry." }, { status: 500 });
		}
	}

	return NextResponse.json({ success: true }, { status: 201 });
}

