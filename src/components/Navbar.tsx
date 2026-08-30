"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types";
import { site } from "@/data/site";

const Navbar = (): React.ReactElement => {
  const pathname: string = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string): boolean =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="Go to home page"
          onClick={() => setOpen(false)}
        >
          <span className="font-headline-lg text-[22px] font-bold tracking-tighter text-on-surface transition-colors group-hover:text-primary">
            {site.brand}
          </span>
          <span className="font-label-caps text-[10px] tracking-[0.18em] text-on-surface-variant">
            {site.name.toUpperCase()}
          </span>
        </Link>

        <div className="hidden items-center gap-gutter md:flex">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body-md text-body-md transition-colors ${
                isActive(link.href)
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden bg-primary px-6 py-2 font-label-caps text-label-caps text-on-primary transition-transform hover:scale-105 hover:bg-primary-fixed active:scale-95 md:inline-block"
          >
            Hire Me
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-outline-variant/40 text-on-surface md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="material-symbols-outlined">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-outline-variant/30 bg-surface md:hidden">
          <div className="flex flex-col px-margin-mobile py-4">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 font-body-md text-body-md ${
                  isActive(link.href) ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-primary px-6 py-3 text-center font-label-caps text-label-caps text-on-primary"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
