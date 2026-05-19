"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center gap-4 min-h-[360px] text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="text-green-500" size={28} />
        </div>
        <h3 className="font-semibold text-slate-900 text-lg">Message sent!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
      <h3 className="font-semibold text-slate-900 text-lg mb-1">Send a message</h3>
      <p className="text-slate-500 text-sm mb-6">I usually respond within 24 hours.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-slate-600 mb-1.5">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-slate-600 mb-1.5">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="What's this about?"
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-slate-600 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project or opportunity..."
            value={form.message}
            onChange={handleChange}
            className={inputClass + " resize-none"}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-1"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <Send size={15} /> Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
