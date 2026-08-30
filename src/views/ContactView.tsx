"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactFormData, FormStatus, SocialLink } from "@/types";
import { site } from "@/data/site";

const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: site.socials.github },
  { platform: "LinkedIn", url: site.socials.linkedin },
  { platform: "Email", url: `mailto:${site.email}` },
  { platform: "Portfolio", url: "https://dev-core-kappa.vercel.app" },
];

export default function ContactView() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const subject = encodeURIComponent(formData.subject || "Project inquiry");
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name}\n${formData.email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setFormStatus("sent");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-stack-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <header className="mb-stack-lg max-w-3xl">
            <div className="mb-6 inline-block border border-primary/20 bg-primary/10 px-3 py-1">
              <span className="font-label-caps text-label-caps uppercase text-primary">
                {site.availability}
              </span>
            </div>
            <h1 className="mb-6 font-headline-xl text-headline-xl">
              Let&apos;s build something{" "}
              <span className="italic text-primary">extraordinary</span>.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Project brief, role, or a quick hello — I read everything. Giza-based, remote-ready.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-stack-md lg:grid-cols-12">
            <div className="border border-outline-variant/20 bg-surface-container-low p-8 lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-gutter">
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-code-sm text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-code-sm text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-code-sm text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="resize-none border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-code-sm text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                    id="message"
                    name="message"
                    placeholder="Tell me about the product, timeline, and stack..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    className={`group flex w-full items-center justify-center gap-2 bg-primary px-10 py-4 font-label-caps text-label-caps text-on-primary transition-all hover:bg-primary-fixed active:scale-95 md:w-auto ${
                      formStatus === "sent" ? "bg-primary-fixed-dim" : ""
                    } ${formStatus === "sending" ? "cursor-not-allowed opacity-70" : ""}`}
                    type="submit"
                    disabled={formStatus === "sending" || formStatus === "sent"}
                  >
                    {formStatus === "sending" && "OPENING MAIL..."}
                    {formStatus === "sent" && "MAIL CLIENT OPENED"}
                    {formStatus === "idle" && "SEND MESSAGE"}
                    {formStatus === "idle" && (
                      <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                        send
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-gutter lg:col-span-5">
              <div className="flex h-fit flex-col justify-between border border-outline-variant/20 bg-surface-container p-8">
                <div>
                  <h2 className="mb-6 font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant">
                    Direct Contact
                  </h2>
                  <div className="space-y-6">
                    <a className="group flex items-center gap-4" href={`mailto:${site.email}`}>
                      <div className="flex h-12 w-12 items-center justify-center border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          Email
                        </p>
                        <p className="font-body-md text-body-md text-on-surface transition-colors group-hover:text-primary">
                          {site.email}
                        </p>
                      </div>
                    </a>
                    <a className="group flex items-center gap-4" href={site.phoneHref}>
                      <div className="flex h-12 w-12 items-center justify-center border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          Phone
                        </p>
                        <p className="font-body-md text-body-md text-on-surface">{site.phone}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center border border-outline-variant/30 bg-surface-variant text-primary">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          Location
                        </p>
                        <p className="font-body-md text-body-md text-on-surface">
                          {site.location} · Remote
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-outline-variant/20 bg-surface-container p-8">
                <h2 className="mb-6 font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant">
                  Digital Footprint
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between border border-outline-variant/20 p-4 transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <span className="font-code-sm text-code-sm">{link.platform}</span>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                        open_in_new
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
