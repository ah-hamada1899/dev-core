import { FooterLink } from "@/types";
import { site } from "@/data/site";

const Footer = (): React.ReactElement => {
  const footerLinks: FooterLink[] = [
    { label: "GitHub", url: site.socials.github },
    { label: "LinkedIn", url: site.socials.linkedin },
    { label: "Email", url: `mailto:${site.email}` },
    { label: "CV", url: site.cvFile },
  ];

  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant/20 bg-surface-container-lowest">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between px-margin-mobile py-stack-md md:flex-row md:px-margin-desktop">
        <div className="mb-6 md:mb-0">
          <p className="font-label-caps text-label-caps text-on-surface-variant">
            © {currentYear} {site.name}. {site.brand}. Built in {site.location}.
          </p>
        </div>
        <div className="flex space-x-gutter">
          {footerLinks.map((link: FooterLink) => (
            <a
              key={link.label}
              href={link.url}
              className="font-code-sm text-code-sm text-on-surface-variant transition-colors hover:text-electric-emerald"
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={`Visit ${link.label}`}
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
