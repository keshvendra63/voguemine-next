"use client";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "../../GlobalContext";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import Whatsapp from "../../components/Whatsapp";

const quicksand = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const cartState = localStorage.getItem("cartState");
    if (!cartState) {
      localStorage.setItem("cartState", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      setProgress(30);
      setTimeout(() => {
        setProgress(100);
      }, 500);
    }
  }, [pathname]);

  return (
    <html lang="en" className={quicksand.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="apple-touch-icon" sizes="180x180" href="https://voguemine.com/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://voguemine.com/favicon-32x32.png"
        />
        <meta
          name="google-site-verification"
          content="xrlT6bzVL4FNaTdCqEXHx8Jp1v6W_i3TF81-ubR22Es"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-850L9ZZH2G"
          strategy="afterInteractive"
        />
        <Script
          id="ga-setup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-850L9ZZH2G');
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WFSMFS6');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '650507833848857');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body className={quicksand.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFSMFS6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <GlobalProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Whatsapp />
          <LoadingBar
            color="black"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
