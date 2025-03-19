"use client"; // Ensure this is a Client Component
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, {useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation"; // For route detection
import { Toaster } from "react-hot-toast";
import {GlobalProvider } from "../../GlobalContext"; // Import the provider
import axios from "axios";
// import Offer from "../../components/offer/Offer";

import { Quicksand } from 'next/font/google'
 
const quicksand = Quicksand({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const cartState = localStorage.getItem("cartState");
    if (!cartState) {
      localStorage.setItem("cartState", JSON.stringify([])); // Initialize as an empty array
    }
  }, []);

  const pathname = usePathname(); // Hook to detect path changes
  useEffect(() => {
    if (pathname) {
      setProgress(30); // Start the progress bar when navigation begins
      setTimeout(() => {
        setProgress(100); // Complete the progress after a delay
      }, 500); // Adjust timing as per your needs
    }
  }, [pathname]); // Trigger effect on route change

  return (
    <html lang="en" className={quicksand.className}>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <link rel="apple-touch-icon" sizes="180x180" href="https://voguemine.com/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="https://voguemine.com/favicon-32x32.png"/>
<meta name="google-site-verification" content="xrlT6bzVL4FNaTdCqEXHx8Jp1v6W_i3TF81-ubR22Es" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-850L9ZZH2G"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-850L9ZZH2G');
          `,
          }}
        />
        <meta name="fast2sms" content="Gq8VyG3vAAQHEfpB1zMZs1hnx4jDfLGP"/>
        {/* Google Tag Manager */}
        <script
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
        <script
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
          <LoadingBar
            color="#C3A37D"
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
