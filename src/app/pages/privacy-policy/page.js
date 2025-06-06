import React from 'react'
import styles from '../policy.module.css'

export const metadata = {
      title: "Policies - Voguemine",
      description:
        "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
      keywords: ["Voguemine","Accessories","Footwear","Men's Clothing","Women's Clothing","Kid's Clothing","About Voguemine"],
      openGraph: {
        title: "Policies - Voguemine",
        description:
          "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
        url: "https://voguemine.com/pages/privacy-policy",
        images: [
          {
            url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_50/v1734682478/dfzq7rtgtph2r965mtjq.jpg",
          },
        ],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://voguemine.com/pages/privacy-policy",
      },
      icons: {
        icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
        apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
        shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
      },
      other: {
        // Add custom meta tags here
        "title": "Policies - Voguemine"
      },
    };
const page = () => {
  return (
    <div className={styles.policy}>
      <h1>Privacy Policy</h1>
      <p className={styles.bold}>SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?</p>
      <p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address. When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system. Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.

</p>
      <p className={styles.bold}>SECTION 2 – CONSENT</p>
      <p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.

</p>
<p>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by Contacting us at <a href="mailto:info@voguemine.com">info@voguemine.com</a>

</p>
      <p className={styles.bold}>SECTION 3 – DISCLOSURE</p>
      <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.

</p>
      <p className={styles.bold}>SECTION 4 – THIRD-PARTY SERVICES</p>
      <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions. For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers. In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located. As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act. Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.

</p>
      <p className={styles.bold}>SECTION 5 – SECURITY</p>
      <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.

</p>
      <p className={styles.bold}>SECTION 6 – COOKIES</p>
      <p>Here is a list of cookies that we use. We’ve listed them here so you that you can choose if you want to opt-out of cookies or not. _session_id, unique token, sessional, Allows Shopify to store information about your session (referrer, landing page, etc.). _shopify_visit, no data held, Persistent for 30 minutes from the last visit, Used by our website provider’s internal stats tracker to record the number of visits. _shopify_uniq, no data held, expires midnight (relative to the visitor) of the next day, Counts the number of visits to a store by a single customer. Cart, unique token, persistent for 2 weeks, Stores information about the contents of your cart. _secure_session_id, unique token, sessional storefront digest, unique token, indefinite If the shop has a password, this is used to determine if the current visitor has access.

</p>
      <p className={styles.bold}>SECTION 7 – AGE OF CONSENT</p>
      <p>By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.

</p>
      <p className={styles.bold}>SECTION 8 – CHANGES TO THIS PRIVACY POLICY</p>
      <p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.

</p>
      <p className={styles.bold}>QUESTIONS AND CONTACT INFORMATION</p>
      <p>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <a href="mailto:info@voguemine.com">info@voguemine.com</a>


</p>
    </div>
  )
}

export default page
