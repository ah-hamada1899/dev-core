"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactFormData, FormStatus, SocialLink } from "@/types";

// Social links data
const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "#" },
  { platform: "LinkedIn", url: "#" },
  { platform: "Twitter", url: "#" },
  { platform: "Dribbble", url: "#" },
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
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("sent");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Hero Header Section */}
          <header className="max-w-3xl mb-stack-lg">
            <div className="inline-block py-1 px-3 mb-6 bg-primary/10 border border-primary/20">
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Availability: Open for Projects
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl mb-6">
              Let's build something{" "}
              <span className="text-primary italic">extraordinary</span>.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Whether you have a specific project in mind or just want to chat about the latest in web tech, my inbox is always open.
            </p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-md">
            {/* Contact Form Section */}
            <div className="lg:col-span-7 bg-surface-container-low p-8 border border-outline-variant/20">
              <form onSubmit={handleSubmit} className="space-y-gutter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant uppercase transition-colors"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      className="bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-code-sm px-4 py-3 transition-colors placeholder:text-outline-variant/50 outline-none"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant uppercase transition-colors"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className="bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-code-sm px-4 py-3 transition-colors placeholder:text-outline-variant/50 outline-none"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps text-on-surface-variant uppercase transition-colors"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-code-sm px-4 py-3 transition-colors placeholder:text-outline-variant/50 outline-none"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps text-on-surface-variant uppercase transition-colors"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface font-code-sm px-4 py-3 transition-colors placeholder:text-outline-variant/50 resize-none outline-none"
                    id="message"
                    name="message"
                    placeholder="Tell me about your vision..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    className={`flex items-center justify-center gap-2 bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 w-full md:w-auto transition-all hover:bg-primary-fixed active:scale-95 group ${
                      formStatus === "sent" ? "bg-primary-fixed-dim text-on-primary" : ""
                    } ${formStatus === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                    type="submit"
                    disabled={formStatus === "sending" || formStatus === "sent"}
                  >
                    {formStatus === "sending" && "SENDING..."}
                    {formStatus === "sent" && "MESSAGE SENT ✓"}
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

            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-gutter">
              {/* Direct Details Card */}
              <div className="bg-surface-container p-8 border border-outline-variant/20 flex flex-col justify-between h-fit">
                <div>
                  <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-[0.2em]">
                    Direct Contact
                  </h2>
                  <div className="space-y-6">
                    <a
                      className="flex items-center gap-4 group"
                      href="mailto:hello@devcore.engineering"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-variant text-primary border border-outline-variant/30 group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                          Email
                        </p>
                        <p className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                          hello@devcore.engineering
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-variant text-primary border border-outline-variant/30 transition-colors">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                          Phone
                        </p>
                        <p className="font-body-md text-body-md text-on-surface">
                          +1 (555) 012-3456
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-variant text-primary border border-outline-variant/30 transition-colors">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                          Location
                        </p>
                        <p className="font-body-md text-body-md text-on-surface">
                          Remote / San Francisco, CA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Presence Card */}
              <div className="bg-surface-container p-8 border border-outline-variant/20">
                <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-[0.2em]">
                  Digital Footprint
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      className="flex items-center justify-between p-4 border border-outline-variant/20 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <span className="font-code-sm text-code-sm">{link.platform}</span>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                        open_in_new
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Visualization / Aesthetic element */}
              <div className="relative h-48 border border-outline-variant/20 overflow-hidden bg-deep-charcoal">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-label-caps text-label-caps text-primary opacity-60 tracking-[0.5em]">
                    SYSTEM_READY
                  </span>
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