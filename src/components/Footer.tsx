import { FooterLink } from "@/types";

const Footer = () => {
  const footerLinks: FooterLink[] = [
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Twitter", url: "#" },
    { label: "Email", url: "#" },
  ];

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center py-stack-md px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-6 md:mb-0">
          <p className="font-label-caps text-label-caps text-on-surface-variant">
            © 2024 DEVCore Engineering. Built with precision.
          </p>
        </div>
        <div className="flex space-x-gutter">
          {footerLinks.map((link: FooterLink) => (
            <a 
              key={link.label}
              href={link.url}
              className="font-code-sm text-code-sm text-on-surface-variant hover:text-electric-emerald transition-colors"
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