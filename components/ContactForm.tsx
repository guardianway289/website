"use client";

import {
  useState,
  forwardRef,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const field =
  "w-full rounded-xl bg-[#FAFBFD] border border-[#E6EEF9] px-4 py-3 text-[#111827] placeholder:text-[#94A3B8] outline-none focus:border-[#153E75] focus:ring-2 focus:ring-[#153E75]/15 transition-colors";
const labelC = "text-sm font-medium text-[#4B5563] mb-1.5 block";
const selectC = `${field} appearance-none`;

type Role = "parent" | "institute";

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  school: string;
  locality: string;
  distance: string;
  transport: string;
  travelHours: string;
  travelMinutes: string;
  monthlyCost: string;
  childGrade: string;
  matters: string[];
  timeline: string;
  callTime: string;
  organization: string;
  designation: string;
  location: string;
  studentCount: string;
  setup: string;
}

const EMPTY_FORM: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  school: "",
  locality: "",
  distance: "",
  transport: "",
  travelHours: "",
  travelMinutes: "",
  monthlyCost: "",
  childGrade: "",
  matters: [],
  timeline: "",
  callTime: "",
  organization: "",
  designation: "",
  location: "",
  studentCount: "",
  setup: "",
};

const ROLES: { k: Role; label: string }[] = [
  { k: "parent", label: "I'm a Parent" },
  { k: "institute", label: "I'm an Institution" },
];

const parentSteps = [
  "Your Details",
  "Your Child's Commute",
  "Your Preferences",
  "Check Availability",
];
const institutionSteps = [
  "Your Details",
  "Your Institution",
  "Let's Connect",
  "Explore Partnership",
];

const SelectField = ({
  label,
  value,
  onChange,
  required = false,
  children,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label className={labelC}>
      {label}
      {required ? " *" : ""}
    </label>
    <select
      className={selectC}
      value={value}
      onChange={onChange}
      required={required}
    >
      {children}
    </select>
  </div>
);

export const ContactForm = forwardRef<HTMLElement>((_props, ref) => {
  const [role, setRole] = useState<Role>("parent");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const set =
    (key: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
    };
  const toggleMatter = (matter: string) => {
    setForm((current) => ({
      ...current,
      matters: current.matters.includes(matter)
        ? current.matters.filter((item) => item !== matter)
        : [...current.matters, matter],
    }));
  };
  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setForm(EMPTY_FORM);
    setSubmitted(false);
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...form }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Unable to submit your enquiry.");
      }

      setForm(EMPTY_FORM);
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const isParent = role === "parent";
  const steps = isParent ? parentSteps : institutionSteps;
  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 md:py-32 -scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Chapter number="04" label="Get In Touch" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
                {isParent
                  ? "Ready for a better school commute?"
                  : "Looking to improve student transportation?"}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[#4B5563] md:text-lg leading-relaxed">
                {isParent
                  ? "Tell us a little about your child's daily commute and we'll get in touch to understand your needs."
                  : "Tell us about your institution and current transport setup. Our team will get in touch to explore how Guardianway can help."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl bg-[#153E75] p-6 shadow-[0_16px_40px_rgba(21,62,117,0.2)]">
                <div className="flex items-center gap-2 text-[#FFC83D]">
                  <ShieldCheck className="h-5 w-5" strokeWidth={2} />
                  <p className="text-xs uppercase tracking-[0.16em] font-bold">
                    {isParent
                      ? "Safety First, Always"
                      : "Built for Better School Transport"}
                  </p>
                </div>
                <p className="mt-3 text-white/85 text-sm">
                  {isParent
                    ? "Shorter routes · Real-time GPS & dashcam access · Verified drivers & audited vehicles"
                    : "Smarter routes · Live tracking · Safety monitoring · Better visibility for schools & parents"}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1} y={24}>
              <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(21,62,117,0.06)] border border-[#E6EEF9]">
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F3F8FF] p-1.5 mb-6">
                  {ROLES.map((item) => (
                    <button
                      key={item.k}
                      type="button"
                      data-testid={`role-${item.k}`}
                      onClick={() => changeRole(item.k)}
                      className={`rounded-xl py-2.5 text-sm font-bold transition-all ${
                        role === item.k
                          ? "bg-[#153E75] text-white shadow-[0_8px_20px_rgba(21,62,117,0.2)]"
                          : "text-[#4B5563] hover:text-[#153E75]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {submitted ? (
                  <div className="flex min-h-120 flex-col items-center justify-center text-center py-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E4F7F0] text-[#168568]">
                      <Check className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl md:text-3xl font-extrabold text-[#111827]">
                      {isParent
                        ? "We've received your response!"
                        : "We've received your enquiry!"}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm md:text-base leading-relaxed text-[#4B5563]">
                      {isParent
                        ? "Thank you for sharing your details with Guardianway. Our team will review your requirements and get in touch with you shortly. We'll contact you through the phone/WhatsApp number or email you provided. We look forward to speaking with you!"
                        : "Thank you for getting in touch with Guardianway. Our team will review your details and contact you shortly to discuss your institution's transportation requirements. We'll reach out through the phone/WhatsApp number or email you provided. We look forward to speaking with you!"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153E75] px-7 py-3.5 font-bold text-white hover:bg-[#0F2E56] transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} data-testid="contact-form">
                    <div className="mb-7 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                      {steps.map((step, index) => (
                        <span
                          key={step}
                          className={
                            index === steps.length - 1 ? "text-[#153E75]" : ""
                          }
                        >
                          {step}
                          {index < steps.length - 1 ? "  →" : ""}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelC}>
                          {isParent ? "Your name" : "Contact person"} *
                        </label>
                        <input
                          required
                          data-testid="input-name"
                          className={field}
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className={labelC}>Phone / WhatsApp *</label>
                        <input
                          required
                          data-testid="input-phone"
                          className={field}
                          value={form.phone}
                          onChange={set("phone")}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelC}>
                          {isParent ? "Email (Optional)" : "Work email"}
                          {isParent ? "" : " *"}
                        </label>
                        <input
                          required={!isParent}
                          data-testid="input-email"
                          type="email"
                          className={field}
                          value={form.email}
                          onChange={set("email")}
                          placeholder={
                            isParent ? "you@example.com" : "name@school.com"
                          }
                        />
                      </div>

                      {isParent ? (
                        <>
                          <div>
                            <label className={labelC}>School *</label>
                            <input
                              required
                              data-testid="input-school"
                              className={field}
                              value={form.school}
                              onChange={set("school")}
                              placeholder="Search or enter school name"
                            />
                          </div>
                          <div>
                            <label className={labelC}>
                              Your home locality / area *
                            </label>
                            <input
                              required
                              className={field}
                              value={form.locality}
                              onChange={set("locality")}
                              placeholder="e.g. Sector 57, Gurugram"
                            />
                          </div>
                          <div>
                            <label className={labelC}>
                              Approx. home-to-school distance *
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                required
                                type="number"
                                min="0"
                                step="0.1"
                                className={field}
                                value={form.distance}
                                onChange={set("distance")}
                                placeholder="___"
                              />
                              <span className="text-sm text-[#6B7280]">km</span>
                            </div>
                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                              Check Google Maps for the approximate one-way
                              driving distance.
                            </p>
                          </div>
                          <SelectField
                            label="Current transport"
                            value={form.transport}
                            onChange={set("transport")}
                            required
                          >
                            <option value="">Select current transport</option>
                            <option>School bus</option>
                            <option>Private van/cab</option>
                            <option>Parent drop-off</option>
                            <option>Other</option>
                          </SelectField>
                          <div>
                            <label className={labelC}>
                              Current one-way travel time *
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                required
                                type="number"
                                min="0"
                                className={field}
                                value={form.travelHours}
                                onChange={set("travelHours")}
                                placeholder="___"
                                aria-label="Hours"
                              />
                              <span className="text-sm text-[#6B7280]">
                                hrs
                              </span>
                              <input
                                required
                                type="number"
                                min="0"
                                max="59"
                                className={field}
                                value={form.travelMinutes}
                                onChange={set("travelMinutes")}
                                placeholder="___"
                                aria-label="Minutes"
                              />
                              <span className="text-sm text-[#6B7280]">
                                min
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                              Approximate time your child currently takes to
                              reach school. Example: 1 hr 25 min
                            </p>
                          </div>
                          <div>
                            <label className={labelC}>
                              Current monthly transportation cost *
                            </label>
                            <input
                              required
                              type="number"
                              min="0"
                              className={field}
                              value={form.monthlyCost}
                              onChange={set("monthlyCost")}
                              placeholder="Enter amount"
                            />
                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                              Approximate amount you currently pay per month.
                            </p>
                          </div>
                          <SelectField
                            label="Child's class / grade"
                            value={form.childGrade}
                            onChange={set("childGrade")}
                          >
                            <option value="">Select class / grade</option>
                            {[
                              "Nursery",
                              "KG",
                              ...Array.from(
                                { length: 12 },
                                (_, index) => `Class ${index + 1}`,
                              ),
                            ].map((grade) => (
                              <option key={grade}>{grade}</option>
                            ))}
                          </SelectField>
                          <fieldset className="sm:col-span-2">
                            <legend className={labelC}>
                              What matters most to you?
                            </legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {[
                                "Safety",
                                "Shorter travel time",
                                "Live tracking",
                                "Convenient pickup & drop",
                              ].map((matter) => (
                                <label
                                  key={matter}
                                  className="flex items-center gap-2 text-sm text-[#374151]"
                                >
                                  <input
                                    type="checkbox"
                                    checked={form.matters.includes(matter)}
                                    onChange={() => toggleMatter(matter)}
                                    className="h-4 w-4 accent-[#153E75]"
                                  />
                                  {matter}
                                </label>
                              ))}
                            </div>
                          </fieldset>
                          <SelectField
                            label="When do you need the service?"
                            value={form.timeline}
                            onChange={set("timeline")}
                            required
                          >
                            <option value="">
                              When do you need the service?
                            </option>
                            <option>As soon as available</option>
                            <option>Within 1 month</option>
                            <option>Within 3 months</option>
                            <option>Just exploring</option>
                          </SelectField>
                          <SelectField
                            label="Best time to call"
                            value={form.callTime}
                            onChange={set("callTime")}
                            required
                          >
                            <option value="">Select preferred call time</option>
                            <option>Morning — 9 AM–12 PM</option>
                            <option>Afternoon — 12 PM–3 PM</option>
                            <option>Evening — 3 PM–6 PM</option>
                            <option>Anytime</option>
                          </SelectField>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className={labelC}>Institution name *</label>
                            <input
                              required
                              className={field}
                              value={form.organization}
                              onChange={set("organization")}
                              placeholder="School / Institute name"
                            />
                          </div>
                          <SelectField
                            label="Your designation"
                            value={form.designation}
                            onChange={set("designation")}
                            required
                          >
                            <option value="">Select designation</option>
                            <option>Principal / Director</option>
                            <option>School Administrator</option>
                            <option>Transport Manager</option>
                            <option>Operations</option>
                            <option>Management</option>
                            <option>Other</option>
                          </SelectField>
                          <div>
                            <label className={labelC}>
                              Institution location *
                            </label>
                            <input
                              required
                              className={field}
                              value={form.location}
                              onChange={set("location")}
                              placeholder="Area / Sector / City"
                            />
                          </div>
                          <SelectField
                            label="Approx. number of students"
                            value={form.studentCount}
                            onChange={set("studentCount")}
                            required
                          >
                            <option value="">Select student strength</option>
                            <option>Under 250</option>
                            <option>250–500</option>
                            <option>500–1,000</option>
                            <option>1,000–2,000</option>
                            <option>2,000+</option>
                          </SelectField>
                          <SelectField
                            label="Current student transportation"
                            value={form.setup}
                            onChange={set("setup")}
                            required
                          >
                            <option value="">Select current setup</option>
                            <option>School-managed buses</option>
                            <option>Third-party transport vendors</option>
                            <option>Parents arrange transport</option>
                            <option>Combination of the above</option>
                            <option>No organized transport</option>
                          </SelectField>
                          <SelectField
                            label="When are you looking to explore this?"
                            value={form.timeline}
                            onChange={set("timeline")}
                            required
                          >
                            <option value="">Select timeline</option>
                            <option>Immediately</option>
                            <option>Within 1–3 months</option>
                            <option>This academic year</option>
                            <option>Just exploring</option>
                          </SelectField>
                          <SelectField
                            label="Best time to call"
                            value={form.callTime}
                            onChange={set("callTime")}
                            required
                          >
                            <option value="">Select preferred call time</option>
                            <option>Morning — 9 AM–12 PM</option>
                            <option>Afternoon — 12 PM–3 PM</option>
                            <option>Evening — 3 PM–6 PM</option>
                            <option>Anytime</option>
                          </SelectField>
                        </>
                      )}
                    </div>

                    <button
                      type="submit"
                      data-testid="contact-submit"
                      disabled={loading}
                      className="mt-7 group inline-flex items-center gap-2 rounded-full bg-[#153E75] px-7 py-3.5 font-bold text-white hover:bg-[#0F2E56] disabled:opacity-60 transition-colors shadow-[0_12px_28px_rgba(21,62,117,0.22)]"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {isParent
                            ? "Submit"  
                            : "Explore Partnership"}{" "}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";
