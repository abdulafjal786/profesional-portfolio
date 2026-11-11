import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem, SplitText, EASE } from "./ui/motion";

const SignalGlobe = lazy(() => import("../three/SignalGlobe"));

const FIELDS = [
  { name: "full_name", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "mobile", label: "Mobile", type: "tel", autoComplete: "tel" },
  { name: "subject", label: "Subject", type: "text" },
];

const EMPTY = { full_name: "", mobile: "", email: "", subject: "", message: "" };

function Field({ name, label, type = "text", value, onChange, textarea, autoComplete }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="group relative">
      <Comp
        id={name}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        required
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full resize-none rounded-2xl border border-line bg-white/[0.03] px-5 pb-3 pt-7 text-paper outline-none transition-all duration-300 placeholder-transparent focus:border-ember/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(241,97,54,0.12)]"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-5 top-5 origin-left text-sm text-mute transition-all duration-300 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-ember peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
    </div>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // const result = await fetch("https://humhai.in/home/Amosta-lead/", {
      const result = await fetch("http://192.168.1.11:8000/home/Amosta-lead/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      const data = await result.json();
      if (data.status === 200) {
        setSent(true);
        setFormData(EMPTY);
      } else {
        setError("Please fill all required fields.");
      }
    } catch (err) {
      setError("Submission failed. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative isolate overflow-hidden pt-28 pb-24">
        <div className="pointer-events-none absolute right-[-20%] top-10 -z-10 h-[90vh] w-[110%] opacity-50 sm:right-[-10%] lg:right-[-8%] lg:w-[60%] lg:opacity-100">
          <Suspense fallback={null}>
            <SignalGlobe className="h-full w-full" />
          </Suspense>
        </div>

        <div className="container-x">
          <div className="max-w-2xl">
            <motion.span className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              Contact
            </motion.span>
            <h1 className="mt-6 font-display text-6xl font-light leading-[0.95] text-paper sm:text-8xl">
              <SplitText text="Get in" delay={0.1} /> <SplitText text="Touch" delay={0.25} className="text-gradient italic" />
            </h1>
            <motion.p
              className="mt-6 max-w-lg text-lg text-mute"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            >
              We&rsquo;d love to hear from you. Reach out to our team for inquiries, partnerships, or just to say hello.
            </motion.p>
          </div>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="glass relative overflow-hidden rounded-[2rem] bg-ink/60 p-6 sm:p-10">
                <h2 className="font-display text-3xl font-light text-paper">Send us a message</h2>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[380px] flex-col items-center justify-center text-center"
                    >
                      <CheckCircle2 size={56} className="text-ember" />
                      <p className="mt-6 font-display text-3xl text-paper">Submission successful!</p>
                      <p className="mt-2 text-mute">Thank you — we&rsquo;ll be in touch soon.</p>
                      <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" exit={{ opacity: 0 }} className="mt-8 space-y-4" onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {FIELDS.map((f) => (
                          <Field key={f.name} {...f} value={formData[f.name]} onChange={handleChange} />
                        ))}
                      </div>
                      <Field name="message" label="How can we help you?" value={formData.message} onChange={handleChange} textarea />
                      {error && (
                        <p role="alert" className="text-sm text-red-400">
                          {error}
                        </p>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 text-base disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Stagger className="flex flex-col gap-4">
              <StaggerItem className="glass rounded-3xl bg-ink/60 p-7">
                <div className="flex gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ember/15 text-ember">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-paper">Our Headquarters</h3>
                    <p className="mt-2 leading-relaxed text-mute">
                      301-B, 402-B, Flatted Factory Complex,
                      <br />
                      Hartron Technology Park Plot No. 25A
                      <br />
                      Electronic City, Sector 18,
                      <br />
                      Gurugram, Haryana 122015.
                    </p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <a href="mailto:arun@arunprabhu.com" className="glass group flex gap-5 rounded-3xl bg-ink/60 p-7 transition-colors hover:border-sky/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky/15 text-sky">
                    <Mail size={20} />
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-paper">Email Us</h3>
                    <p className="mt-2 text-mute transition-colors group-hover:text-sky">arun@arunprabhu.com</p>
                  </div>
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="tel:+918882212649" className="glass group flex gap-5 rounded-3xl bg-ink/60 p-7 transition-colors hover:border-ember/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ember/15 text-ember">
                    <Phone size={20} />
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-paper">Call Us</h3>
                    <p className="mt-2 text-mute transition-colors group-hover:text-ember">+91 88822 12649</p>
                  </div>
                </a>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
