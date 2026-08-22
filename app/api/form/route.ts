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
		const { error } = await supabase.from("parent_enquiries").insert({
			name: data.name,
			phone: data.phone,
			email: data.email || null,
			school: data.school,
			locality: data.locality,
			distance_km: data.distance,
			current_transport: data.transport,
			travel_hours: data.travelHours,
			travel_minutes: data.travelMinutes,
			monthly_transport_cost: data.monthlyCost,
			child_grade: data.childGrade || null,
			matters: data.matters || [],
			service_timeline: data.timeline,
			preferred_call_time: data.callTime,
		});

		if (error) {
			console.error("Parent enquiry insert failed", error);
			return NextResponse.json({ error: "Unable to save parent enquiry." }, { status: 500 });
		}
	} else {
		const { error } = await supabase.from("institution_enquiries").insert({
			contact_person: data.name,
			phone: data.phone,
			work_email: data.email,
			institution_name: data.organization,
			designation: data.designation,
			institution_location: data.location,
			student_strength: data.studentCount,
			current_transport_setup: data.setup,
			exploration_timeline: data.timeline,
			preferred_call_time: data.callTime,
		});

		if (error) {
			console.error("Institution enquiry insert failed", error);
			return NextResponse.json({ error: "Unable to save institution enquiry." }, { status: 500 });
		}
	}

	return NextResponse.json({ success: true }, { status: 201 });
}

