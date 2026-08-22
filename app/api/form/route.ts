import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

type FormPayload = {
	role?: "parent" | "institute";
	name?: string;
	phone?: string;
	email?: string;
	school?: string;
	locality?: string;
	distance?: string;
	transport?: string;
	travelHours?: string;
	travelMinutes?: string;
	monthlyCost?: string;
	childGrade?: string;
	matters?: string[];
	timeline?: string;
	callTime?: string;
	organization?: string;
	designation?: string;
	location?: string;
	studentCount?: string;
	setup?: string;
};

const required = (value: unknown) =>
	typeof value === "string" && value.trim().length > 0;

const numberValue = (value: unknown) => {
	if (typeof value !== "string" || value.trim() === "") return null;
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
};

export async function POST(request: Request) {
	let body: FormPayload;

	try {
		body = (await request.json()) as FormPayload;
	} catch {
		return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
	}

	if (body.role !== "parent" && body.role !== "institute") {
		return NextResponse.json({ error: "A valid form role is required." }, { status: 400 });
	}

	if (!required(body.name) || !required(body.phone) || !required(body.email)) {
		return NextResponse.json(
			{ error: "Name, phone, and email are required." },
			{ status: 400 },
		);
	}

	if (body.role === "parent") {
		const name = body.name?.trim();
		const phone = body.phone?.trim();
		const email = body.email?.trim();
		const school = body.school?.trim();
		const locality = body.locality?.trim();
		const distance = numberValue(body.distance);
		const travelHours = numberValue(body.travelHours);
		const travelMinutes = numberValue(body.travelMinutes);
		const monthlyCost = numberValue(body.monthlyCost);

		if (
			!required(body.school) ||
			!required(body.locality) ||
			!required(body.transport) ||
			!required(body.timeline) ||
			!required(body.callTime) ||
			distance === null ||
			travelHours === null ||
			travelMinutes === null ||
			monthlyCost === null ||
			!Number.isInteger(travelHours) ||
			!Number.isInteger(travelMinutes) ||
			travelHours < 0 ||
			travelMinutes < 0 ||
			travelMinutes > 59 ||
			distance < 0 ||
			monthlyCost < 0
		) {
			return NextResponse.json(
				{ error: "Please provide all required parent enquiry details." },
				{ status: 400 },
			);
		}

		const { error } = await supabase.from("parent_enquiries").insert({
			name,
			phone,
			email,
			school,
			locality,
			distance_km: distance,
			current_transport: body.transport,
			travel_hours: travelHours,
			travel_minutes: travelMinutes,
			monthly_transport_cost: monthlyCost,
			child_grade: body.childGrade || null,
			matters: Array.isArray(body.matters) ? body.matters : [],
			service_timeline: body.timeline,
			preferred_call_time: body.callTime,
		});

		if (error) {
			console.error("Parent enquiry insert failed", error);
			return NextResponse.json({ error: "Unable to save parent enquiry." }, { status: 500 });
		}
	} else {
		const name = body.name?.trim();
		const phone = body.phone?.trim();
		const email = body.email?.trim();
		const organization = body.organization?.trim();
		const location = body.location?.trim();

		if (
			!required(body.organization) ||
			!required(body.designation) ||
			!required(body.location) ||
			!required(body.studentCount) ||
			!required(body.setup) ||
			!required(body.timeline) ||
			!required(body.callTime)
		) {
			return NextResponse.json(
				{ error: "Please provide all required institution enquiry details." },
				{ status: 400 },
			);
		}

		const { error } = await supabase.from("institution_enquiries").insert({
			contact_person: name,
			phone,
			work_email: email,
			institution_name: organization,
			designation: body.designation,
			institution_location: location,
			student_strength: body.studentCount,
			current_transport_setup: body.setup,
			exploration_timeline: body.timeline,
			preferred_call_time: body.callTime,
		});

		if (error) {
			console.error("Institution enquiry insert failed", error);
			return NextResponse.json({ error: "Unable to save institution enquiry." }, { status: 500 });
		}
	}

	return NextResponse.json({ success: true }, { status: 201 });
}
