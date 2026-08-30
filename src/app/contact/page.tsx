import ContactView from "@/views/ContactView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Ahmed Hamada at ah.hamada1899@gmail.com — Front-End / Next.js work.",
};

export default function ContactPage(): React.ReactElement {
  return <ContactView />;
}