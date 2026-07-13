import { useState, forwardRef, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal, Chapter } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const field =
  "w-full rounded-xl bg-[#FAFBFD] border border-[#E6EEF9] px-4 py-3 text-[#111827] placeholder:text-[#94A3B8] outline-none focus:border-[#153E75] focus:ring-2 focus:ring-[#153E75]/15 transition-colors";
const labelC = "text-sm font-medium text-[#4B5563] mb-1.5 block";

type Role = "parent" | "institute";

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  organization: string;
  location: string;
  child_grade: string;
  student_count: string;
  message: string;
}

const EMPTY_FORM: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  organization: "",
  location: "",
  child_grade: "",
  student_count: "",
  message: "",
};

const ROLES: { k: Role; label: string }[] = [
  { k: "parent", label: "I'm a Parent" },
  { k: "institute", label: "I'm an Institution" },
];

export const ContactForm = forwardRef<HTMLElement>((_props, ref) => {
  const [role, setRole] = useState<Role>("parent");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);

  const set =
    (k: keyof ContactFormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      toast.success("Thank you! Our team will contact you shortly.");
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Reveal><Chapter number="04" label="Get In Touch" /></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
                Ready for a better school commute?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[#4B5563] md:text-lg leading-relaxed">
                Tell us a little about yourself and our team will reach out to discuss routes,
                availability and pricing. Whether you&apos;re a parent or an institution — we&apos;re listening.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl bg-[#153E75] p-6 shadow-[0_16px_40px_rgba(21,62,117,0.2)]">
                <div className="flex items-center gap-2 text-[#FFC83D]">
                  <ShieldCheck className="h-5 w-5" strokeWidth={2} />
                  <p className="text-xs uppercase tracking-[0.16em] font-bold">Safety First, Always</p>
                </div>
                <p className="mt-3 text-white/85 text-sm">
                  Shortest school route · Real-time GPS &amp; dashcam access · Verified drivers &amp; audited vehicles.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1} y={24}>
              <form onSubmit={submit} data-testid="contact-form" className="rounded-3xl gw-card p-6 md:p-8">
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F3F8FF] p-1.5 mb-6">
                  {ROLES.map((r) => (
                    <button
                      key={r.k}
                      type="button"
                      data-testid={`role-${r.k}`}
                      onClick={() => setRole(r.k)}
                      className={`rounded-xl py-2.5 text-sm font-bold transition-all ${
                        role === r.k
                          ? "bg-[#153E75] text-white shadow-[0_8px_20px_rgba(21,62,117,0.2)]"
                          : "text-[#4B5563] hover:text-[#153E75]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelC}>{role === "institute" ? "Contact person name" : "Your name"} *</label>
                    <input data-testid="input-name" className={field} value={form.name} onChange={set("name")} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelC}>Phone / WhatsApp *</label>
                    <input data-testid="input-phone" className={field} value={form.phone} onChange={set("phone")} placeholder="+91" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelC}>Email</label>
                    <input data-testid="input-email" type="email" className={field} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                  </div>

                  {role === "parent" ? (
                    <>
                      <div>
                        <label className={labelC}>Child&apos;s class / grade</label>
                        <input data-testid="input-child-grade" className={field} value={form.child_grade} onChange={set("child_grade")} placeholder="e.g. Grade 6" />
                      </div>
                      <div>
                        <label className={labelC}>Your locality / school</label>
                        <input data-testid="input-location" className={field} value={form.location} onChange={set("location")} placeholder="Area & school name" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className={labelC}>Institution name</label>
                        <input data-testid="input-organization" className={field} value={form.organization} onChange={set("organization")} placeholder="School / institute" />
                      </div>
                      <div>
                        <label className={labelC}>Approx. students</label>
                        <input data-testid="input-student-count" className={field} value={form.student_count} onChange={set("student_count")} placeholder="e.g. 500" />
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <label className={labelC}>Message</label>
                    <textarea data-testid="input-message" rows={4} className={field} value={form.message} onChange={set("message")} placeholder="Tell us what you need..." />
                  </div>
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={loading}
                  className="mt-6 group inline-flex items-center gap-2 rounded-full bg-[#153E75] px-7 py-3.5 font-bold text-white hover:bg-[#0F2E56] disabled:opacity-60 transition-colors shadow-[0_12px_28px_rgba(21,62,117,0.22)]"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Request a Callback <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactForm.displayName = "ContactForm";