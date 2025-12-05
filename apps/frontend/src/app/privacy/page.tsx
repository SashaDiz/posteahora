import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@gitroom/frontend/components/new-layout/logo';

export const metadata: Metadata = {
  title: 'Privacy Policy - PosteaHora',
  description: 'Privacy Policy for PosteaHora - Your agentic social media scheduling tool',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-newTextItemBlur mb-12">
          At PosteaHora ("Company," "we," "us," or "our"), we are committed to protecting the privacy and security of our users' personal information. This Privacy Policy outlines how we collect, use, and safeguard the personal information collected on our website. By accessing or using our website, registering for the Website, and providing your personal information, you agree to the terms and conditions of this Privacy Policy.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Our Services</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">PosteaHora Services</h3>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              PosteaHora's suite of social media management and social care tools is accessible via our websites and mobile applications. These tools allow you to combine all your social media accounts for easy access and management through a single online platform. Through this platform, you can manage your social media, marketing, and advertising campaigns, engage with your audiences, schedule and publish messages, manage customer care communications, and analyze the results of these activities.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Social Networks</h3>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Any collection, use, and management of personal information by the social networks, including Facebook, Instagram, Twitter, LinkedIn, and TikTok (collectively, the "Social Networks") are governed by their respective privacy policies and terms. When using Social Networks, you must comply with their privacy policies and terms. We recommend carefully reviewing their privacy policies and terms, as PosteaHora is not responsible for Social Networks.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Your Privacy Obligations</h3>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We rely on you to comply with applicable privacy laws when collecting, using, or disclosing information about individuals through the Services, including obtaining any necessary consents and providing any necessary notices. If we receive any questions or complaints regarding your use of the Services, we will direct the request to you for further assistance.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Business Purposes</h3>
            <p className="text-newTextItemBlur leading-relaxed">
              Our Services are not intended for use by children and should only be accessed by individuals at least 18 years old and are using the Services for business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. What information do we collect?</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We collect information about you as reasonably necessary for the following activities:
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Using our Services</h3>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We may collect the following information when you use our Services:
            </p>

            <h4 className="text-lg font-semibold mb-2 mt-4">Account information:</h4>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>Your contact and profile information, including your name, email address, organization name, and address; your preferences such as language, time zone, and the types of communications you would like to receive from us; and image (if you choose to provide this). We may also obtain this information if you use a social login service like Facebook Login to create or access your account.</li>
              <li>Billing and other payment information (if you sign up for a paid service), including payment method details, such as credit card number.</li>
              <li>The Services you have acquired from us, including the type of plan, number of team members, and transaction information related to the Services.</li>
            </ul>

            <h4 className="text-lg font-semibold mb-2 mt-4">Content:</h4>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>Your social profile information for Social Networks you choose to connect to the Services. For example, your Facebook profile information may include your Facebook username and profile image.</li>
              <li>If you share this information, please provide a specific location, such as an address, a city, or a place (for example, a restaurant).</li>
              <li>Your messages, posts, comments, images, and other material you curate on and upload to the Services, as well as information collected from the social networks you choose to connect to and display on our Services.</li>
              <li>Social media content and other user-generated content (for example, posts, comments, pages, profiles, likes, and feeds)</li>
              <li>Messaging content that individuals choose to share (for example, social media messages, in-app messages)</li>
              <li>Social media and messaging metadata (for example, number of social media followers, number of posts, number of tweets)</li>
              <li>Content that you may send and receive through Social Networks and other messaging services, such as SMS, may contain personal information of third parties. This may include information such as names, photos, age, gender, geographic location, opinions, preferences, and phone numbers that are provided or posted by social media users.</li>
            </ul>

            <h4 className="text-lg font-semibold mb-2 mt-4">Logs, usage, and support data:</h4>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>Log data, which may include your IP address, the address of the web page you visited before using the Services, your browser type and settings, your device information (such as make, model, and OS), the date and time when you used the Services, information about your browser configuration, language preferences, unique identifiers, and cookies.</li>
              <li>Usage data and analytics may include the frequency of logins and the different types of activity users undertake, such as frequently accessed service areas.</li>
              <li>General Location information, such as IP address and the region in which you are located when logging in and using the Services, by the settings on your device.</li>
              <li>Customer support questions, issues, and general feedback that you choose to provide.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Surveys, events, marketing, and other activities</h3>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Surveys, contests, and events (such as webinars and in-person events) for those we host or are affiliated with:
            </p>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>Contact information includes your name, email address, telephone number, organization name, and address.</li>
              <li>Participation, attendance, feedback, and survey responses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How do we use your information?</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>Provide, maintain, and improve our Services;</li>
              <li>Process transactions and send related information, including purchase confirmations and invoices;</li>
              <li>Send technical notices, updates, security alerts, and support and administrative messages;</li>
              <li>Respond to your comments, questions, and requests and provide customer service;</li>
              <li>Communicate with you about products, services, offers, promotions, and events and provide other news or information about us and our partners;</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services;</li>
              <li>Personalize and improve the Services and provide content or features that match user profiles or interests;</li>
              <li>Process and deliver contest entries and rewards;</li>
              <li>Link or combine with information we get from others to help understand your needs and provide you with better service;</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the rights and property of PosteaHora and others;</li>
              <li>Carry out any other purpose for which the information was collected.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How do we share your information?</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>With your consent or at your direction;</li>
              <li>With service providers who perform services on our behalf;</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company;</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of PosteaHora or others;</li>
              <li>Between and among PosteaHora and our current and future parents, affiliates, subsidiaries, and other companies under common control and ownership;</li>
              <li>As required by law or to respond to legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>The right to access your personal information;</li>
              <li>The right to correct inaccurate personal information;</li>
              <li>The right to delete your personal information;</li>
              <li>The right to object to processing of your personal information;</li>
              <li>The right to restrict processing of your personal information;</li>
              <li>The right to data portability;</li>
              <li>The right to withdraw consent where processing is based on consent.</li>
            </ul>
            <p className="text-newTextItemBlur leading-relaxed">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@posteahora.com" className="text-newBtnPrimary hover:underline">
                privacy@posteahora.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. PosteaHora as a Data Processor</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              When you use our Services and make decisions about the personal data being processed in them (including selecting the Social Network accounts you wish to connect to the Services or uploading and using Content), you are acting as a data controller, and PosteaHora is acting as a data processor.
            </p>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              As a data controller, you have certain obligations under applicable data protection laws, including managing Content on the Services. As a data processor, PosteaHora will only access and process Content to provide you with the Services by your instructions (which you provide through the Services), the Terms of Service, the Social Networks' terms, and applicable laws.
            </p>
            <p className="text-newTextItemBlur leading-relaxed">
              As part of delivering the Services, we may process Content to improve further the Services, such as enhancing usability and developing new features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Your California Privacy Rights</h2>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              If you are a consumer as defined in the California Consumer Privacy Act (CCPA) and as amended by the California Privacy Rights Act (CPRA) (collectively, "California Privacy Laws"), the following provisions apply to you.
            </p>
            <p className="text-newTextItemBlur leading-relaxed mb-4">
              Under the California Privacy Laws, you may have the following specific rights:
            </p>
            <ul className="list-disc list-inside text-newTextItemBlur space-y-2 mb-4 ml-4">
              <li>The right to know about the personal information collected about you;</li>
              <li>The right to have your personal information deleted;</li>
              <li>The right to correct inaccurate personal information;</li>
              <li>The right not to be discriminated against for exercising consumer rights under California Privacy Laws.</li>
            </ul>
            <p className="text-newTextItemBlur leading-relaxed">
              You may access, update, or correct most of your Account information by logging in to your account; or you may exercise your rights by emailing our Privacy team at{' '}
              <a href="mailto:privacy@posteahora.com" className="text-newBtnPrimary hover:underline">
                privacy@posteahora.com
              </a>
              . While we disclose personal information to service providers for the purpose of managing our relationship with you (e.g. distributing marketing communications) and providing the Services, we do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to this Privacy Policy</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              We may change this privacy policy at any time to reflect updates to our Services, applicable laws, and other factors. If we make any material changes, we will include a prominent notice on this website and/or our Services, but we encourage you to review this policy periodically to stay informed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="text-newTextItemBlur leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@posteahora.com" className="text-newBtnPrimary hover:underline">
                privacy@posteahora.com
              </a>
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

