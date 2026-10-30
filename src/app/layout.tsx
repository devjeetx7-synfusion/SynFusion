import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SynFusion | Premium Digital Product & Development Agency",
    template: "%s | SynFusion",
  },
  description:
    "SynFusion is a premium digital development agency specializing in Android app development, modern website development, web applications, UI/UX design, custom software, and AI-powered applications.",
  keywords: [
    "Digital Agency",
    "Android App Development",
    "Website Development",
    "Web Applications",
    "UI/UX Design",
    "Custom Software",
    "AI Applications",
    "SynFusion",
  ],
  authors: [{ name: "SynFusion Team" }],
  creator: "SynFusion",
  metadataBase: new URL("https://synfusion.com"),
  openGraph: {
    title: "SynFusion — We Build. We Innovate. We Scale.",
    description:
      "We build digital experiences that move businesses forward. Android apps, web platforms, UI/UX design, custom software, and AI integration.",
    url: "https://synfusion.com",
    siteName: "SynFusion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SynFusion | Digital Product & Development Agency",
    description: "We build digital experiences that move businesses forward.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SynFusion",
    description: "Premium Digital Product & Development Agency",
    url: "https://synfusion.com",
    telephone: "+91 9334603912",
    email: "dharmjeetsingh958@gmail.com",
    slogan: "We Build. We Innovate. We Scale.",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Android App Development",
      "Website Development",
      "Web Application Development",
      "UI/UX Design",
      "Custom Software Development",
      "AI-Powered Applications",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-[#17251E] antialiased selection:bg-[#008F4C]/20 selection:text-[#064E32]">
        {children}
      </body>
    </html>
  );
}
