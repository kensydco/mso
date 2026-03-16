/**
 * Terms of Service Page
 * Displays the company's terms of service
 */

import Layout from '@/components/layout/Layout';

const COMPANY_NAME = 'Kensyd Companies';
const CONTACT_EMAIL = 'info@kensydcompanies.com';
const CONTACT_ADDRESS = 'Memphis, TN';

export default function TermsOfService() {
  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#0F172A] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#64748B] mb-12">Last updated: January 18, 2026</p>

          <div className="prose prose-lg max-w-none text-[#334155]">
            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the website and services of {COMPANY_NAME} (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our website or services.
              </p>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use of our services following any changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                2. Description of Services
              </h2>
              <p>
                {COMPANY_NAME} is a management services organization that operates and manages a portfolio of brands across various industries including fitness, healthcare, and service sectors. Our website provides information about our company, portfolio brands, career opportunities, and news updates.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                3. User Accounts and Registration
              </h2>
              <p>
                Certain features of our website may require you to create an account or provide personal information. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update your information if it changes</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                4. Job Applications
              </h2>
              <p>
                When you submit a job application through our website, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All information provided is accurate and complete</li>
                <li>You have the legal right to work in the applicable jurisdiction</li>
                <li>You authorize us to verify your information and conduct background checks as permitted by law</li>
                <li>Submission of an application does not guarantee employment</li>
              </ul>
              <p>
                We reserve the right to reject any application at our sole discretion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                5. Communications and Consent
              </h2>
              <p>
                By providing your contact information, you consent to receive communications from us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email communications regarding your inquiries or applications</li>
                <li>SMS/text messages if you have opted in (standard message and data rates may apply)</li>
                <li>Promotional materials and newsletters (with opt-out option)</li>
              </ul>
              <p>
                <strong>SMS Terms:</strong> By opting in to SMS communications, you agree to receive text messages from {COMPANY_NAME}. Message frequency varies. Reply STOP to unsubscribe at any time. Reply HELP for assistance. Message and data rates may apply.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                6. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of {COMPANY_NAME} or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our trademarks or logos without written consent</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Remove any copyright or proprietary notices</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                7. Prohibited Conduct
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to any systems</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Scrape, crawl, or use automated means to access our services without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party sites is at your own risk and subject to their terms and policies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                9. Disclaimer of Warranties
              </h2>
              <p>
                OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>We do not warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our services will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>Our services are free of viruses or harmful components</li>
                <li>Information on our website is complete or accurate</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                10. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_NAME.toUpperCase()} AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OUR SERVICES.
              </p>
              <p>
                Our total liability for any claims arising from these Terms or your use of our services shall not exceed the amount you paid to us, if any, during the twelve months preceding the claim.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless {COMPANY_NAME} and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of third parties</li>
                <li>Any content you submit or transmit through our services</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                12. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Tennessee, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved exclusively in the state or federal courts located in Shelby County, Tennessee.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                13. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                14. Entire Agreement
              </h2>
              <p>
                These Terms, together with our{' '}
                <a href="/privacy" className="text-[#3B82F6] hover:underline">
                  Privacy Policy
                </a>
                , constitute the entire agreement between you and {COMPANY_NAME} regarding your use of our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                15. Contact Information
              </h2>
              <p>If you have questions about these Terms, please contact us at:</p>
              <div className="bg-[#F8FAFC] rounded-lg p-6 mt-4">
                <p className="font-semibold text-[#0F172A]">{COMPANY_NAME}</p>
                <p>{CONTACT_ADDRESS}</p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[#3B82F6] hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
