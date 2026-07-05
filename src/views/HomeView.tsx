"use client";

import { useEffect, useRef, RefObject } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadCVButton from "@/components/DownloadCVButton";
import { SectionRef } from "@/types";
import Image from "next/image";
import portfolio from "../img/portfolio.png"; 


// Project data with proper typing
interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  imageAlt: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "quantum-ledger",
    title: "Quantum Ledger Finance",
    description: "Real-time distributed ledger for enterprise asset tracking.",
    tags: ["Next.js", "Web3"],
    category: "CASE STUDY",
    imageAlt: "A clean, minimalist UI dashboard for a financial technology application"
  },
  {
    id: "nova-archios",
    title: "Nova Archi-OS",
    description: "Project management for modern architects.",
    tags: [],
    category: "MOBILE APP",
    imageAlt: "A minimalist architectural website design showcasing brutalist layout principles"
  },
  {
    id: "core-engine",
    title: "Core Engine v2",
    description: "Proprietary rendering logic.",
    tags: [],
    category: "",
    imageAlt: "A stylized code editor displaying high-performance C++ or Rust algorithms"
  },
  {
    id: "synth-intelligence",
    title: "Synth Intelligence",
    description: "Predictive analysis API.",
    tags: [],
    category: "",
    imageAlt: "An abstract 3D visualization of a neural network or complex data pipeline"
  }
];

export default function HomeView() {
  const sectionsRef = useRef<SectionRef[]>([]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section: SectionRef) => {
      if (section) {
        section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
        observer.observe(section);
      }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 80,
              behavior: "smooth",
            });
          }
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-hidden">
        {/* Hero Section */}
        <section
          ref={(el: SectionRef) => { sectionsRef.current[0] = el; }}
          className="relative min-h-[80vh] flex items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg transition-all duration-1000"
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-gutter items-center w-full">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center space-x-2">
                <span className="w-12 h-[1px] bg-primary"></span>
                <span className="font-label-caps text-label-caps text-primary">
                  FULL-STACK ENGINEER & ARCHITECT
                </span>
              </div>
              <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
                Building Digital Experiences with <span className="text-primary">Precision</span>.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
                Specializing in high-performance web applications, scalable cloud architecture, and clean, maintainable codebases for modern enterprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="bg-primary text-on-primary px-8 py-4 font-label-caps text-label-caps hover:bg-primary-fixed transition-all duration-300 inline-block text-center"
                >
                  VIEW PROJECTS
                </Link>
                <DownloadCVButton variant="secondary" />
              </div>
            </div>
            <div className="hidden lg:block relative group">
              <div className="relative aspect-square border border-outline-variant/30 bg-surface-container-low overflow-hidden">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Image
                    src={portfolio}
                    alt="portfolio image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-container border border-outline-variant p-6 max-w-[200px] animate-float">
                <div className="font-label-caps text-label-caps text-primary mb-2">
                  CURRENT STACK
                </div>
                <div className="font-code-sm text-code-sm text-on-surface-variant leading-relaxed">
                  React, Next.js, Node.js, TypeScript, PostgreSQL, AWS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section
          ref={(el: SectionRef) => { sectionsRef.current[1] = el; }}
          className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest transition-all duration-1000"
          id="projects"
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                Featured Projects
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Handpicked works showcasing engineering craft.
              </p>
            </div>
            <Link
              href="/projects"
              className="font-label-caps text-label-caps text-primary hover:text-primary-fixed flex items-center group"
            >
              VIEW ALL{" "}
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Featured Card - Quantum Ledger */}
            <div className="md:col-span-8 group cursor-pointer">
              <div className="relative overflow-hidden bg-surface-container border border-outline-variant/30 aspect-[16/9] mb-4 group-hover:border-primary transition-colors duration-500">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform duration-700">
                  <span className="font-code-sm">[Project Image]</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-deep-charcoal/80 backdrop-blur-md px-3 py-1 border border-outline-variant/30 font-code-sm text-code-sm text-primary">
                    {featuredProjects[0].category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-lg text-[24px] mb-2 group-hover:text-primary transition-colors">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {featuredProjects[0].description}
                  </p>
                </div>
                <div className="flex gap-2">
                  {featuredProjects[0].tags.map((tag: string) => (
                    <span key={tag} className="font-code-sm text-code-sm px-2 py-1 bg-surface-container-high border border-outline-variant/20 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Card - Nova Archi-OS */}
            <div className="md:col-span-4 group cursor-pointer">
              <div className="relative overflow-hidden bg-surface-container border border-outline-variant/30 aspect-[3/4] mb-4 group-hover:border-primary transition-colors duration-500">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform duration-700">
                  <span className="font-code-sm">[Project Image]</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-deep-charcoal/80 backdrop-blur-md px-3 py-1 border border-outline-variant/30 font-code-sm text-code-sm text-primary">
                    {featuredProjects[1].category}
                  </span>
                </div>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-2 group-hover:text-primary transition-colors">
                {featuredProjects[1].title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {featuredProjects[1].description}
              </p>
            </div>

            {/* Smaller Bento Pieces */}
            {featuredProjects.slice(2).map((project: FeaturedProject) => (
              <div key={project.id} className="md:col-span-4 group cursor-pointer">
                <div className="relative overflow-hidden bg-surface-container border border-outline-variant/30 aspect-square mb-4 group-hover:border-primary transition-colors duration-500">
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform duration-700">
                    <span className="font-code-sm">[Project Image]</span>
                  </div>
                </div>
                <h3 className="font-headline-lg text-[20px] mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {project.description}
                </p>
              </div>
            ))}

            {/* Your Project Next Card */}
            <div className="md:col-span-4 flex items-center justify-center border border-dashed border-outline-variant/40 aspect-square p-8 text-center hover:border-primary group transition-all cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:text-primary transition-colors">
                  add_circle
                </span>
                <h3 className="font-headline-lg text-[20px] mb-2">
                  Your Project Next?
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Let's build something exceptional together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me / Expertise */}
        <section
          ref={(el: SectionRef) => { sectionsRef.current[2] = el; }}
          className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden transition-all duration-1000"
        >
          <div className="grid lg:grid-cols-2 gap-stack-lg items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-primary/20"></div>
              <div className="relative p-8 bg-surface-container-low border border-outline-variant/30">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
                  With over 8 years in the field, I bridge the gap between creative vision and technical execution. My approach is rooted in the philosophy that{" "}
                  <span className="text-primary">code is craft</span>.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">
                      terminal
                    </span>
                    <div>
                      <h4 className="font-headline-lg text-[18px] mb-1">
                        Architecture-First
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        I build systems that grow with you, focusing on modularity and long-term stability.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">
                      speed
                    </span>
                    <div>
                      <h4 className="font-headline-lg text-[18px] mb-1">
                        Performance Obsessed
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Every millisecond counts. I optimize for the fastest possible user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-headline-xl-mobile md:font-headline-lg text-headline-xl-mobile md:text-headline-lg mb-6">
                Meticulous Engineering, <br />
                <span className="text-primary">Creative Soul</span>.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                I am a full-stack developer who believes in the beauty of a well-documented API and the impact of a perfectly timed transition. My work lives at the intersection of performance and aesthetics.
              </p>
              <div className="grid grid-cols-2 gap-gutter">
                <div>
                  <div className="font-headline-lg text-headline-lg mb-1">85+</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    PROJECTS SHIPPED
                  </div>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg mb-1">12</div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    INDUSTRY AWARDS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={(el: SectionRef) => { sectionsRef.current[3] = el; }}
          className="py-stack-lg bg-primary text-on-primary text-center transition-all duration-100"
        >
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6  selection-bg-text">
              Let's code the future.
            </h2>
            <p className="font-body-lg text-body-lg mb-10 max-w-2xl mx-auto opacity-80 text-on-primary">
              Currently accepting select freelance opportunities and enterprise consulting engagements.
            </p>
            <button 
              type="button"
              className="bg-deep-charcoal text-primary px-12 py-5 font-label-caps text-label-caps hover:bg-surface transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              START A CONVERSATION
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}