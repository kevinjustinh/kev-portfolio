import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ProfileView from "@/components/profile/ProfileView";
import "./profile.css";

// Test route for the MySpace-style profile exploration. Not linked from the
// homepage and kept out of search results.

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Kevin J Hernandez's Profile",
  description: "A profile for hire: Community, Program Ops & DevRel.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <div className={geist.variable}>
      <ProfileView />
    </div>
  );
}
