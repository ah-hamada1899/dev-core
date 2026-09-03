"use client";

import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactFormData, FormStatus, SocialLink } from "@/types";
import { site } from "@/data/site";
import {
  gsap,
  useGSAP,
  SplitText,
  bindMagnetic,
  bindScramble,
  isRtl,
  prefersReducedMotion,
} from "@/lib/motion";

export default function ContactView() {
  const t = useTranslations("contact");
  const tSite = useTranslations("site");
  const ref = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const socialLinks: SocialLink[] = [
    { platform: "GitHub", url: site.socials.github },
    { platform: "LinkedIn", url: site.socials.linkedin },
    { platform: "Email", url: `mailto:${site.email}` },
    { platform: "Portfolio", url: "https://dev-core-kappa.vercel.app" },
  ];

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

    const subject = encodeURIComponent(formData.subject || t("defaultSubject"));
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name}\n${formData.email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setFormStatus("sent");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const unbindMagnetic = bindMagnetic(root);
      const unbindScramble = bindScramble(root);

      if (prefersReducedMotion()) {
        return () => {
          unbindMagnetic();
          unbindScramble();
        };
      }

      const title = root.querySelector<HTMLElement>("[data-intro-title]");
      const lead = root.querySelector("[data-intro-lead]");
      const rtl = isRtl();

      if (title) {
        const split = SplitText.create(title, {
          type: rtl ? "words" : "words,chars",
          mask: "words",
          aria: "auto",
        });
        const units = !rtl && split.chars.length > 0 ? split.chars : split.words;
        gsap.from(units, { yPercent: 115, duration: 0.95, stagger: rtl ? 0.05 : 0.02, ease: "expo.out" });
      }
      if (lead) gsap.from(lead, { y: 20, autoAlpha: 0, duration: 0.75, delay: 0.18, ease: "expo.out" });

      gsap.from(root.querySelectorAll("[data-contact-panel]"), {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.22,
        ease: "expo.out",
      });
      gsap.from(root.querySelectorAll("[data-contact-field]"), {
        y: 18,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });

      return () => {
        unbindMagnetic();
        unbindScramble();
      };
    },
    { scope: ref }
  );

  return (
    <>
      <Navbar />
      <main
        ref={ref}
        className="min-h-screen pt-[calc(4rem+env(safe-area-inset-top)+1.5rem)] pb-16 md:pt-32 md:pb-stack-lg"
      >
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <header className="mb-10 max-w-3xl md:mb-stack-lg">
            <h1
              data-intro-title=""
              className="mb-5 font-headline-xl-mobile text-[2.125rem] leading-tight text-on-surface md:mb-6 md:font-headline-xl md:text-headline-xl"
            >
              {t("title")} <span className="text-primary">{t("titleAccent")}</span>.
            </h1>
            <p
              data-intro-lead=""
              className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant"
            >
              {t("lead")}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-stack-md lg:grid-cols-12">
            <div
              data-contact-panel=""
              className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-5 md:p-8 lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-gutter">
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                  <div data-contact-field="" className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                      htmlFor="name"
                    >
                      {t("name")}
                    </label>
                    <input
                      className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                      id="name"
                      name="name"
                      placeholder={t("namePlaceholder")}
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div data-contact-field="" className="flex flex-col gap-2">
                    <label
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                      htmlFor="email"
                    >
                      {t("email")}
                    </label>
                    <input
                      className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                      id="email"
                      name="email"
                      placeholder={t("emailPlaceholder")}
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div data-contact-field="" className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    htmlFor="subject"
                  >
                    {t("subject")}
                  </label>
                  <input
                    className="border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                    id="subject"
                    name="subject"
                    placeholder={t("subjectPlaceholder")}
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div data-contact-field="" className="flex flex-col gap-2">
                  <label
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    htmlFor="message"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    className="resize-none border-0 border-b border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] text-on-surface outline-none transition-colors placeholder:text-outline-variant/50 focus:border-primary"
                    id="message"
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div data-contact-field="" className="pt-4">
                  <button
                    data-magnetic=""
                    className={`btn-primary group inline-flex min-h-12 w-full gap-2 rounded-sm px-10 py-4 font-label-caps text-label-caps md:w-auto ${
                      formStatus === "sent" ? "bg-primary-fixed-dim" : ""
                    } ${formStatus === "sending" ? "cursor-not-allowed opacity-70" : ""}`}
                    type="submit"
                    disabled={formStatus === "sending" || formStatus === "sent"}
                  >
                    {formStatus === "sending" && t("sending")}
                    {formStatus === "sent" && t("sent")}
                    {formStatus === "idle" && t("send")}
                    {formStatus === "idle" && (
                      <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        send
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-gutter lg:col-span-5">
              <div
                data-contact-panel=""
                className="flex h-fit flex-col justify-between rounded-sm border border-outline-variant/20 bg-surface-container p-5 md:p-8"
              >
                <div>
                  <h2 className="mb-6 font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant">
                    {t("direct")}
                  </h2>
                  <div className="space-y-6">
                    <a className="group flex items-center gap-4" href={`mailto:${site.email}`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          {t("email")}
                        </p>
                        <p
                          dir="ltr"
                          className="break-all font-body-md text-body-md text-on-surface transition-colors group-hover:text-primary"
                        >
                          {site.email}
                        </p>
                      </div>
                    </a>
                    <a className="group flex items-center gap-4" href={site.phoneHref}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-outline-variant/30 bg-surface-variant text-primary transition-colors group-hover:border-primary">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          {t("phone")}
                        </p>
                        <p dir="ltr" className="font-body-md text-body-md text-on-surface">
                          {site.phone}
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-outline-variant/30 bg-surface-variant text-primary">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                          {t("location")}
                        </p>
                        <p className="font-body-md text-body-md text-on-surface">
                          {t("locationValue", { location: tSite("location") })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-contact-panel=""
                className="rounded-sm border border-outline-variant/20 bg-surface-container p-5 md:p-8"
              >
                <h2 className="mb-6 font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant">
                  {t("footprint")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      data-magnetic="0.18"
                      data-scramble=""
                      data-scramble-text={link.platform}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between rounded-sm border border-outline-variant/20 p-4 transition-all hover:border-primary hover:bg-primary/5"
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
