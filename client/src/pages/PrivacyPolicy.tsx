/**
 * Privacy Policy Page
 * Displays the company's privacy policy
 */

import Layout from '@/components/layout/Layout';

const COMPANY_NAME = 'Kensyd Companies';
const CONTACT_EMAIL = 'info@kensydcompanies.com';
const CONTACT_ADDRESS = 'Memphis, TN';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#0F172A] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#64748B] mb-12">Last updated: January 18, 2026</p>

          <div className="prose prose-lg max-w-none text-[#334155]">
            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                1. Introduction
              </h2>
              <p>
                {COMPANY_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                2. Information We Collect
              </h2>
              <h3 className="font-semibold text-xl text-[#0F172A] mt-6 mb-3">Personal Data</h3>
              <p>We may collect personally identifiable information that you voluntarily provide, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name (first and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Resume and employment history (for job applicants)</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <h3 className="font-semibold text-xl text-[#0F172A] mt-6 mb-3">Automatically Collected Data</h3>
              <p>When you visit our website, we may automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Geographic location (country/region level)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and respond to your inquiries and requests</li>
                <li>To evaluate job applications and communicate with applicants</li>
                <li>To send administrative information, updates, and promotional materials</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                4. SMS/Text Message Communications
              </h2>
              <p>
                If you provide your phone number and consent to receive text messages from us, you agree to receive SMS communications related to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Job application status updates</li>
                <li>Interview scheduling and reminders</li>
                <li>Important service announcements</li>
              </ul>
              <p className="mt-4">
                <strong>Message frequency varies.</strong> Message and data rates may apply. You can opt out at any time by replying STOP to any message or by contacting us directly.
              </p>
              <p>
                <strong>We do not share your phone number with third parties for marketing purposes.</strong> Your phone number will only be used for the purposes described in this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                5. Disclosure of Your Information
              </h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business</li>
                <li><strong>For Legal Compliance:</strong> When required by law or to respond to legal process</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you have given us permission to share your information</li>
              </ul>
              <p className="mt-4">
                <strong>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</strong>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                6. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                7. Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Job application data is typically retained for up to two years unless you request earlier deletion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                8. Your Rights
              </h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                9. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                10. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have questions or concerns about this privacy policy or our data practices, please contact us at:
              </p>
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
