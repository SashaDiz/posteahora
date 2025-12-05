import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@gitroom/frontend/components/new-layout/logo';

export const metadata: Metadata = {
  title: 'Terms of Service - PosteaHora',
  description: 'Terms of Service for PosteaHora - Your agentic social media scheduling tool',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-newBgColor text-newTextColor">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-newBgColorInner/80 backdrop-blur-sm border-b border-newBlockSeparator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Logo />
              <span className="text-xl font-semibold whitespace-nowrap">PosteaHora</span>
            </Link>
            <div className="flex items-center gap-6 flex-shrink-0">
              <Link
                href="/auth/login"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors whitespace-nowrap"
              >
                Sign in
              </Link>
              <Link
                href="/auth"
                className="px-4 py-2 bg-newBtnPrimary text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-newTextItemBlur mb-12">
          Welcome to the PosteaHora website (the "Site"). By accessing or using the Site, you agree to comply with and be bound by the following terms and conditions ("Terms of Service").
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Newsletter Subscription</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              You may subscribe to our newsletter to receive updates about our products and promotions. By subscribing to our newsletter, you agree to receive marketing communications from us via email. You can unsubscribe from our newsletter at any time by clicking the "unsubscribe" link in the email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Payment</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              If you purchase a subscription to our service, you agree to pay the applicable fees as indicated during the checkout process. All payments are final and non-refundable, unless otherwise specified by law. We may use a third-party payment processor to process your payment, and your payment information will be subject to the processor's privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Use of Cookies</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We use cookies and similar technologies to track your usage of the Site and for marketing purposes. By using the Site, you consent to the use of cookies in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              All content on the Site, including but not limited to text, graphics, logos, images, videos, and service content, is the property of PosteaHora or its licensors and is protected by intellectual property laws. You may not reproduce, modify, distribute, or otherwise use any content on the Site without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              The information and content on the Site, including the service content, are provided for informational purposes only and are not intended as professional advice. We make no representations or warranties of any kind, express or implied, about the accuracy, reliability, completeness, or suitability of the information and content on the Site. You use the Site and the service content at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              In no event shall PosteaHora be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site, the service content, or your subscription to the newsletter, whether based on contract, tort, negligence, strict liability, or otherwise. Our total liability to you for any claim arising out of or in connection with the Site, the service content, or your subscription to the newsletter shall not exceed the total amount paid by you for the service subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to the Terms of Service</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We may update or modify these Terms of Service from time to time, and any changes will be effective upon posting on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the revised Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              You agree to indemnify and hold harmless PosteaHora, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees, arising out of or in connection with your use of the Site, the service content, or your subscription to the newsletter, your violation of these Terms of Service, or your violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law and Jurisdiction</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction where PosteaHora is headquartered without giving effect to any principles of conflicts of law. You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction for any disputes arising out of or in connection with these Terms of Service or your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Entire Agreement</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              These Terms of Service constitute the entire agreement between you and PosteaHora regarding your use of the Site, the service content, and your subscription to the newsletter and supersede all prior and contemporaneous agreements and understandings, whether oral or written, relating to the same subject matter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Severability</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Waiver</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              The failure of PosteaHora to enforce any right or provision of these Terms of Service shall not constitute a waiver of that right or provision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              If you have any questions or concerns about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@posteahora.com" className="text-newBtnPrimary hover:underline">
                support@posteahora.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Third Party Terms</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Our primary purpose for using information is to publish your content on social networks you've authenticated with.
            </p>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We may allow you to link your account on PosteaHora with an account on a third-party social network platform, such as YouTube, and to transfer your information to and from the applicable third-party platform.
            </p>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Once you connect your content to a social media platform, its use will be governed by its terms. For example, if you choose to connect your YouTube account to the Services, this connection uses YouTube's API services, and the{' '}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-newBtnPrimary hover:underline"
              >
                YouTube Terms of Service
              </a>{' '}
              located at https://www.youtube.com/t/terms will apply to you.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-newBlockSeparator">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-newTextItemBlur text-sm">
              © {new Date().getFullYear()} PosteaHora. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

