import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, description, honeypot } = body;

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a service." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a project description with at least 10 characters." },
        { status: 400 }
      );
    }

    // In a real production deployment with credentials configured in env, email sending logic (e.g., via Resend / SendGrid / Nodemailer) would go here.
    // For now, we validate securely and return success response.
    console.log("Valid contact form submission received:", {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "N/A",
      service,
      budget: budget || "N/A",
      description: description.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your project request has been received. We will get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit request. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
