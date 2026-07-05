import { FooterLink } from "@/types";

const Footer = (): React.ReactElement => {
  const footerLinks: FooterLink[] = [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Twitter", url: "https://twitter.com" },
    { label: "Email", url: "mailto:hello@devcore.engineering" },
  ];

  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center py-stack-md px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-6 md:mb-0">
          <p className="font-label-caps text-label-caps text-on-surface-variant">
            © {currentYear} DEVCore Engineering. Built with precision.
          </p>
        </div>
        <div className="flex space-x-gutter">
          {footerLinks.map((link: FooterLink) => (
            <a 
              key={link.label}
              href={link.url}
              className="font-code-sm text-code-sm text-on-surface-variant hover:text-electric-emerald transition-colors"
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
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