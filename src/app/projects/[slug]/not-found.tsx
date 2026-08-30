import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectNotFound(): React.ReactElement {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-margin-mobile pt-32 text-center">
        <span className="mb-4 font-label-caps text-label-caps text-primary">404</span>
        <h1 className="mb-4 font-headline-lg text-headline-lg">Project not found</h1>
        <p className="mb-8 max-w-md font-body-md text-body-md text-on-surface-variant">
          That case study is not in the archive. Browse the full list instead.
        </p>
        <Link
          href="/projects"
          className="bg-primary px-8 py-3 font-label-caps text-label-caps text-on-primary"
        >
          BACK TO PROJECTS
        </Link>
      </main>
      <Footer />
    </>
  );
}
