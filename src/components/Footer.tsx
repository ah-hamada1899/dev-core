"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import { useGSAP, bindScramble } from "@/lib/motion";

const Footer = (): React.ReactElement => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);

  const footerLinks = [
    { label: "GitHub", url: site.socials.github },
    { label: "LinkedIn", url: site.socials.linkedin },
    { label: "Email", url: `mailto:${site.email}` },
    { label: "CV", url: site.cvFile },
  ];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      return bindScramble(root);
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="border-t border-outline-variant/20 bg-surface-container-lowest">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 px-margin-mobile py-8 text-center md:flex-row md:px-margin-desktop md:py-stack-md md:text-start">
        <div>
          <p className="font-label-caps text-[11px] leading-relaxed text-on-surface-variant md:text-label-caps">
            © {currentYear} {site.name}. {site.brand}. Built in Giza, Egypt.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 md:gap-gutter">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              data-scramble=""
              data-scramble-text={link.label}
              className="font-code-sm text-code-sm text-on-surface-variant transition-colors hover:text-electric-emerald"
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
