import ContactView from "@/views/ContactView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | DEV_CORE",
  description: "Get in touch for project inquiries or collaborations.",
};

export default function ContactPage(): React.ReactElement {
  return <ContactView />;
}