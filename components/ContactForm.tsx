"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";
import { validateContactForm, validateStep } from "@/app/lib/validations/form";

const field =
  "w-full rounded-xl bg-[#FAFBFD] border border-[#E6EEF9] px-4 py-3 text-[#111827] placeholder:text-[#94A3B8] outline-none focus:border-[#153E75] focus:ring-2 focus:ring-[#153E75]/15 transition-all text-sm md:text-base";
const fieldErr =
  "w-full rounded-xl bg-[#FAFBFD] border border-red-500 px-4 py-3 text-[#111827] placeholder:text-[#94A3B8] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm md:text-base";
const labelC = "text-xs md:text-sm font-semibold text-[#374151] mb-1.5 block";
const selectC = `${field} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10`;
const selectCErr = `${fieldErr} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23EF4444%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10`;

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

const parentStepTitles = [
  "About your child",
  "Current commute",
  "What matters to you",
];
const parentBreadcrumbs = ["About you", "Current commute", "Your needs"];

const institutionStepTitles = [
  "Your details",
  "Your institution",
  "Current setup & partnership",
];
const institutionBreadcrumbs = [
  "Your details",
  "Your institution",
  "Current setup",
];

const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1 animate-in fade-in duration-200">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {error}
    </p>
  );
};

const SelectField = ({
  label,
  value,
  onChange,
  required = false,
  error,
  children,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) => (
  <div>
    <label className={labelC}>
      {label}
      {required ? " *" : ""}
    </label>
    <select
      className={error ? selectCErr : selectC}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
    <FieldError error={error} />
  </div>
);

export const ContactForm = forwardRef<HTMLElement>((_props, ref) => {
  const [role, setRole] = useState<Role>("parent");
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [showSwitchConfirm, setShowSwitchConfirm] = useState<Role | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, role]);

  const isFormDirty = () => {
    return Object.values(form).some((val) =>
      Array.isArray(val) ? val.length > 0 : Boolean(val)
    );
  };

  const set =
    (key: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  const toggleMatter = (matter: string) => {
    setForm((current) => ({
      ...current,
      matters: current.matters.includes(matter)
        ? current.matters.filter((item) => item !== matter)
        : [...current.matters, matter],
    }));
  };

  const requestRoleChange = (nextRole: Role) => {
    if (nextRole === role) return;
    if (isFormDirty()) {
      setShowSwitchConfirm(nextRole);
    } else {
      executeRoleChange(nextRole);
    }
  };

  const executeRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    setStep(1);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setShowSwitchConfirm(null);
  };

  const handleNextStep = () => {
    const validation = validateStep(role, step, form);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Final step validation
    const stepValidation = validateStep(role, 3, form);
    if (!stepValidation.success) {
      setErrors(stepValidation.errors);
      return;
    }

    // Comprehensive client-side validation
    const validation = validateContactForm({ role, ...form });
    if (!validation.success) {
      setErrors(validation.errors);
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
          details?: Record<string, string>;
        } | null;

        if (result?.details) {
          setErrors(result.details);
        }
        throw new Error(result?.error || "Unable to submit your enquiry.");
      }

      setForm(EMPTY_FORM);
      setSubmitted(true);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isParent = role === "parent";
  const stepTitles = isParent ? parentStepTitles : institutionStepTitles;
  const breadcrumbs = isParent ? parentBreadcrumbs : institutionBreadcrumbs;

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-16 md:py-24 -scroll-mt-10 bg-[#FAFBFD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left-Side Content */}
          <div className="lg:col-span-5">
            <Reveal>
              <Chapter
                number="04"
                label={isParent ? "YOUR COMMUTE" : "GET IN TOUCH"}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-tight mt-2">
                {isParent
                  ? "Tell us about your child's commute."
                  : "Looking to improve student transportation?"}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 md:mt-6 text-[#4B5563] text-sm md:text-base lg:text-lg leading-relaxed">
                {isParent
                  ? "A few details will help us understand your family's needs and whether Guardian Way could be a good fit."
                  : "Tell us about your institution and current transport setup. Our team will get in touch to explore how Guardian Way can help."}
              </p>
            </Reveal>

            {/* Blue Information Box */}
            <Reveal delay={0.15}>
              <div className="mt-6 md:mt-8 rounded-2xl bg-[#153E75] p-5 md:p-6 shadow-[0_16px_40px_rgba(21,62,117,0.18)]">
                <div className="flex items-center gap-2 text-[#FFC83D]">
                  <ShieldCheck className="h-5 w-5 shrink-0" strokeWidth={2} />
                  <p className="text-xs uppercase tracking-[0.14em] font-extrabold">
                    {isParent
                      ? "BUILT AROUND YOUR CHILD"
                      : "BUILT FOR BETTER SCHOOL TRANSPORT"}
                  </p>
                </div>
                <p className="mt-3 text-white/90 text-xs sm:text-sm font-medium leading-relaxed">
                  {isParent
                    ? "Safer routes · Live tracking · Dashcam access · Verified drivers"
                    : "Smarter routes · Live tracking · Safety monitoring · Better visibility for schools & parents"}
                </p>
                {isParent && (
                  <p className="mt-3 pt-3 border-t border-white/15 text-white/70 text-xs italic">
                    Your answers help us understand what your family needs.
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right-Side Form Card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} y={24} className="h-full">
              <div className="rounded-3xl bg-white p-5 sm:p-7 md:p-8 shadow-[0_8px_30px_rgba(21,62,117,0.06)] border border-[#E6EEF9] h-[520px] sm:h-[560px] flex flex-col justify-between">
                {/* Tab Switcher */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F3F8FF] p-1.5 mb-4 shrink-0">
                  {ROLES.map((item) => (
                    <button
                      key={item.k}
                      type="button"
                      data-testid={`role-${item.k}`}
                      onClick={() => requestRoleChange(item.k)}
                      className={`rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all ${
                        role === item.k
                          ? "bg-[#153E75] text-white shadow-[0_4px_14px_rgba(21,62,117,0.25)]"
                          : "text-[#4B5563] hover:text-[#153E75]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Role Switch Confirmation Banner */}
                {showSwitchConfirm && (
                  <div className="mb-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs sm:text-sm text-amber-900 animate-in fade-in duration-200 shrink-0">
                    <p className="font-semibold mb-2">
                      Switching tabs will reset your entered details. Continue?
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => executeRoleChange(showSwitchConfirm)}
                        className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
                      >
                        Yes, Switch Tab
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSwitchConfirm(null)}
                        className="rounded-lg bg-white border border-amber-300 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {submitted ? (
                  /* Success View */
                  <div className="flex flex-col items-center justify-center text-center py-8 md:py-12 flex-1 min-h-0 overflow-y-auto contact-form-scroll">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E4F7F0] text-[#168568] mb-4">
                      <Check className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827]">
                      Thanks — we’ve received your details.
                    </h3>
                    <p className="mt-4 max-w-lg text-sm md:text-base leading-relaxed text-[#4B5563]">
                      Our team will get in touch with you via call, WhatsApp or email to understand your commute and discuss the next steps.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                      }}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153E75] px-7 py-3.5 font-bold text-white hover:bg-[#0F2E56] transition-colors shadow-lg"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  /* 3-Step Guided Form */
                  <form
                    noValidate
                    onSubmit={submit}
                    data-testid="contact-form"
                    className="flex-1 min-h-0 flex flex-col justify-between"
                  >
                    {/* Header Progress & Indicator */}
                    <div className="mb-4 shrink-0">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#153E75] mb-2">
                        <span>
                          {step} of 3 · {stepTitles[step - 1]}
                        </span>
                        <span className="text-[#94A3B8] font-normal">
                          Step {step} of 3
                        </span>
                      </div>

                      {/* Progress Line */}
                      <div className="h-1.5 w-full rounded-full bg-[#E6EEF9] overflow-hidden mb-3">
                        <div
                          className="h-full bg-[#153E75] transition-all duration-300 ease-out rounded-full"
                          style={{
                            width: `${(step / 3) * 100}%`,
                          }}
                        />
                      </div>

                      {/* Breadcrumb Steps */}
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#94A3B8] gap-1">
                        {breadcrumbs.map((crumb, idx) => {
                          const stepNum = idx + 1;
                          const isActive = stepNum === step;
                          const isCompleted = stepNum < step;
                          return (
                            <span
                              key={crumb}
                              className={`flex items-center gap-1 ${
                                isActive
                                  ? "text-[#153E75] font-bold"
                                  : isCompleted
                                  ? "text-[#168568]"
                                  : "text-[#94A3B8]"
                              }`}
                            >
                              {isCompleted && (
                                <Check className="h-3 w-3 inline shrink-0" />
                              )}
                              {crumb}
                              {idx < breadcrumbs.length - 1 && (
                                <span className="text-[#CBD5E1] mx-0.5 sm:mx-1">
                                  →
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step Content with Internal Scroll */}
                    <div
                      ref={scrollContainerRef}
                      className="space-y-4 md:space-y-5 flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-2 contact-form-scroll"
                    >
                      {isParent ? (
                        /* Parent Flow Steps */
                        <>
                          {step === 1 && (
                            <>
                              <div>
                                <label className={labelC}>Your name *</label>
                                <input
                                  data-testid="input-name"
                                  className={errors.name ? fieldErr : field}
                                  value={form.name}
                                  onChange={set("name")}
                                  placeholder="Full name"
                                />
                                <FieldError error={errors.name} />
                              </div>

                              <div>
                                <label className={labelC}>Phone / WhatsApp *</label>
                                <input
                                  data-testid="input-phone"
                                  className={errors.phone ? fieldErr : field}
                                  value={form.phone}
                                  onChange={set("phone")}
                                  placeholder="+91 XXXXX XXXXX"
                                />
                                <FieldError error={errors.phone} />
                              </div>

                              <div>
                                <label className={labelC}>Email (Optional)</label>
                                <input
                                  data-testid="input-email"
                                  type="email"
                                  className={errors.email ? fieldErr : field}
                                  value={form.email}
                                  onChange={set("email")}
                                  placeholder="you@example.com"
                                />
                                <FieldError error={errors.email} />
                              </div>

                              <div>
                                <label className={labelC}>School *</label>
                                <input
                                  data-testid="input-school"
                                  className={errors.school ? fieldErr : field}
                                  value={form.school}
                                  onChange={set("school")}
                                  placeholder="Search or enter school name"
                                />
                                <FieldError error={errors.school} />
                              </div>

                              <div>
                                <label className={labelC}>
                                  Where do you live? *
                                </label>
                                <input
                                  className={errors.locality ? fieldErr : field}
                                  value={form.locality}
                                  onChange={set("locality")}
                                  placeholder="e.g. Sector 57, Gurugram"
                                />
                                <FieldError error={errors.locality} />
                              </div>

                              <SelectField
                                label="Child's class / grade"
                                value={form.childGrade}
                                onChange={set("childGrade")}
                                error={errors.childGrade}
                              >
                                <option value="">Select class / grade</option>
                                {[
                                  "Nursery",
                                  "KG",
                                  ...Array.from(
                                    { length: 12 },
                                    (_, index) => `Class ${index + 1}`
                                  ),
                                ].map((grade) => (
                                  <option key={grade}>{grade}</option>
                                ))}
                              </SelectField>
                            </>
                          )}

                          {step === 2 && (
                            <>
                              <SelectField
                                label="How does your child travel to school today?"
                                value={form.transport}
                                onChange={set("transport")}
                                required
                                error={errors.transport}
                              >
                                <option value="">Select current transport</option>
                                <option>School bus</option>
                                <option>Private van/cab</option>
                                <option>Parent drop-off</option>
                                <option>Other</option>
                              </SelectField>

                              <div>
                                <label className={labelC}>
                                  How far is your home from school? *
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className={errors.distance ? fieldErr : field}
                                    value={form.distance}
                                    onChange={set("distance")}
                                    placeholder="__"
                                  />
                                  <span className="text-sm font-semibold text-[#4B5563] shrink-0">
                                    km
                                  </span>
                                </div>
                                <FieldError error={errors.distance} />
                                <p className="mt-1 text-xs text-[#94A3B8]">
                                  Approx. one-way driving distance.
                                </p>
                              </div>

                              <div>
                                <label className={labelC}>
                                  How long does the journey take? *
                                </label>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5 flex-1">
                                    <input
                                      type="number"
                                      min="0"
                                      className={
                                        errors.travelHours ? fieldErr : field
                                      }
                                      value={form.travelHours}
                                      onChange={set("travelHours")}
                                      placeholder="__"
                                      aria-label="Hours"
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-[#6B7280]">
                                      hrs
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-1">
                                    <input
                                      type="number"
                                      min="0"
                                      max="59"
                                      className={
                                        errors.travelMinutes ? fieldErr : field
                                      }
                                      value={form.travelMinutes}
                                      onChange={set("travelMinutes")}
                                      placeholder="__"
                                      aria-label="Minutes"
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-[#6B7280]">
                                      min
                                    </span>
                                  </div>
                                </div>
                                <FieldError
                                  error={
                                    errors.travelHours || errors.travelMinutes
                                  }
                                />
                                <p className="mt-1 text-xs text-[#94A3B8]">
                                  Approx. one-way travel time to school.
                                </p>
                              </div>

                              <div>
                                <label className={labelC}>
                                  What do you currently pay for transportation? *
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#4B5563]">
                                    ₹
                                  </span>
                                  <input
                                    type="number"
                                    min="0"
                                    className={`${
                                      errors.monthlyCost ? fieldErr : field
                                    } pl-8`}
                                    value={form.monthlyCost}
                                    onChange={set("monthlyCost")}
                                    placeholder="Enter amount"
                                  />
                                </div>
                                <FieldError error={errors.monthlyCost} />
                                <p className="mt-1 text-xs text-[#94A3B8]">
                                  Approx. monthly cost.
                                </p>
                              </div>
                            </>
                          )}

                          {step === 3 && (
                            <>
                              <div>
                                <label className={labelC}>
                                  What matters most to you?
                                </label>
                                <p className="text-xs text-[#94A3B8] mb-2.5">
                                  Select one or more choices
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {[
                                    "Safety",
                                    "Shorter travel time",
                                    "Live tracking",
                                    "Convenient pickup & drop",
                                  ].map((matter) => {
                                    const isSelected =
                                      form.matters.includes(matter);
                                    return (
                                      <button
                                        key={matter}
                                        type="button"
                                        onClick={() => toggleMatter(matter)}
                                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                                          isSelected
                                            ? "bg-[#153E75] text-white border-[#153E75] shadow-sm font-bold"
                                            : "bg-[#FAFBFD] border-[#E6EEF9] text-[#374151] hover:border-[#153E75]/40 font-medium"
                                        }`}
                                      >
                                        <span className="text-xs sm:text-sm">
                                          {matter}
                                        </span>
                                        {isSelected ? (
                                          <Check className="h-4 w-4 shrink-0 text-white" />
                                        ) : (
                                          <span className="h-4 w-4 rounded-full border border-[#CBD5E1]" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <SelectField
                                label="When would you like to start?"
                                value={form.timeline}
                                onChange={set("timeline")}
                                required
                                error={errors.timeline}
                              >
                                <option value="">Select timeline</option>
                                <option>As soon as available</option>
                                <option>Within the next 1–3 months</option>
                                <option>Later this year</option>
                                <option>Just exploring for now</option>
                              </SelectField>

                              <SelectField
                                label="When should we call you?"
                                value={form.callTime}
                                onChange={set("callTime")}
                                required
                                error={errors.callTime}
                              >
                                <option value="">Select preferred call time</option>
                                <option>9 AM–12 PM</option>
                                <option>12 PM–3 PM</option>
                                <option>3 PM–6 PM</option>
                                <option>6 PM–9 PM</option>
                              </SelectField>

                              <p className="text-xs text-[#6B7280] leading-relaxed pt-1">
                                Your information is used only to understand your
                                commute and contact you about Guardian Way.
                              </p>
                            </>
                          )}
                        </>
                      ) : (
                        /* Institution Flow Steps */
                        <>
                          {step === 1 && (
                            <>
                              <div>
                                <label className={labelC}>Contact person *</label>
                                <input
                                  data-testid="input-name"
                                  className={errors.name ? fieldErr : field}
                                  value={form.name}
                                  onChange={set("name")}
                                  placeholder="Full name"
                                />
                                <FieldError error={errors.name} />
                              </div>

                              <div>
                                <label className={labelC}>Phone / WhatsApp *</label>
                                <input
                                  data-testid="input-phone"
                                  className={errors.phone ? fieldErr : field}
                                  value={form.phone}
                                  onChange={set("phone")}
                                  placeholder="+91 XXXXX XXXXX"
                                />
                                <FieldError error={errors.phone} />
                              </div>

                              <div>
                                <label className={labelC}>Work email *</label>
                                <input
                                  data-testid="input-email"
                                  type="email"
                                  className={errors.email ? fieldErr : field}
                                  value={form.email}
                                  onChange={set("email")}
                                  placeholder="name@school.com"
                                />
                                <FieldError error={errors.email} />
                              </div>
                            </>
                          )}

                          {step === 2 && (
                            <>
                              <div>
                                <label className={labelC}>Institution name *</label>
                                <input
                                  className={
                                    errors.organization ? fieldErr : field
                                  }
                                  value={form.organization}
                                  onChange={set("organization")}
                                  placeholder="School / Institute name"
                                />
                                <FieldError error={errors.organization} />
                              </div>

                              <SelectField
                                label="Your designation"
                                value={form.designation}
                                onChange={set("designation")}
                                required
                                error={errors.designation}
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
                                  className={errors.location ? fieldErr : field}
                                  value={form.location}
                                  onChange={set("location")}
                                  placeholder="Area / Sector / City"
                                />
                                <FieldError error={errors.location} />
                              </div>

                              <SelectField
                                label="Approx. number of students"
                                value={form.studentCount}
                                onChange={set("studentCount")}
                                required
                                error={errors.studentCount}
                              >
                                <option value="">Select student strength</option>
                                <option>Under 250</option>
                                <option>250–500</option>
                                <option>500–1,000</option>
                                <option>1,000–2,000</option>
                                <option>2,000+</option>
                              </SelectField>
                            </>
                          )}

                          {step === 3 && (
                            <>
                              <SelectField
                                label="Current student transportation"
                                value={form.setup}
                                onChange={set("setup")}
                                required
                                error={errors.setup}
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
                                error={errors.timeline}
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
                                error={errors.callTime}
                              >
                                <option value="">Select preferred call time</option>
                                <option>9 AM–12 PM</option>
                                <option>12 PM–3 PM</option>
                                <option>3 PM–6 PM</option>
                                <option>6 PM–9 PM</option>
                                <option>Anytime</option>
                              </SelectField>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Form Navigation Controls */}
                    <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-[#E6EEF9]">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#374151] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="inline-flex items-center gap-2 rounded-full bg-[#153E75] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#0F2E56] transition-colors shadow-[0_8px_20px_rgba(21,62,117,0.2)] ml-auto"
                        >
                          Continue <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          data-testid="contact-submit"
                          disabled={loading}
                          className="inline-flex items-center gap-2 rounded-full bg-[#153E75] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[#0F2E56] disabled:opacity-60 transition-colors shadow-[0_8px_20px_rgba(21,62,117,0.2)] ml-auto"
                        >
                          {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              {isParent
                                ? "See if Guardian Way fits →"
                                : "Explore Partnership →"}
                            </>
                          )}
                        </button>
                      )}
                    </div>
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

