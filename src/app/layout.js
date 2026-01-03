import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import { cookies } from "next/headers";

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";

export const metadata = {
  title: BLOG_TITLE,
  content: BLOG_DESCRIPTION,
};

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

async function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";

  const themeColors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={themeColors}
      >
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for Site"
          href="/feed"
        />
        <body>
          <Header theme={theme} />

          <main>{children}</main>

          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
