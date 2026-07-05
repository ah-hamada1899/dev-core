"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types";

const Navbar = () => {
  const pathname = usePathname();
  
  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string): boolean => pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-surface border-b border-outline-variant/30 z-50">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link 
          href="/" 
          className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tighter"
        >
          DEV_CORE
        </Link>
        <div className="hidden md:flex items-center gap-gutter">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body-md text-body-md transition-colors ${
                isActive(link.href) 
                  ? "text-primary font-bold border-b-2 border-primary pb-1" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button 
          type="button"
          className="bg-primary text-on-primary px-6 py-2 font-label-caps text-label-caps transition-transform active:scale-95 hover:bg-primary-fixed hover:scale-110"
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
};

export default Navbar;