'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@gitroom/frontend/components/new-layout/logo';
import clsx from 'clsx';
import ImageWithFallback from '@gitroom/react/helpers/image.with.fallback';

const socialChannels = [
  { name: 'X', icon: 'x' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Threads', icon: 'threads' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'TikTok', icon: 'tiktok' },
  { name: 'Reddit', icon: 'reddit' },
  { name: 'Pinterest', icon: 'pinterest' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Discord', icon: 'discord' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Mastodon', icon: 'mastodon' },
  { name: 'Bluesky', icon: 'bluesky' },
  { name: 'Lemmy', icon: 'lemmy' },
  { name: 'Warpcast', icon: 'wrapcast' },
  { name: 'Telegram', icon: 'telegram' },
  { name: 'Nostr', icon: 'nostr' },
  { name: 'VK', icon: 'vk' },
  { name: 'Medium', icon: 'medium' },
  { name: 'DevTo', icon: 'devto' },
  { name: 'Hashnode', icon: 'hashnode' },
  { name: 'WordPress', icon: 'wordpress' },
];

const features = [
  {
    icon: '📅',
    title: 'Seamless scheduling',
    description: 'Schedule your posts and engage your audience across all your social media channels like Facebook, Instagram, YouTube, and more.',
    longDescription: 'Schedule your posts and engage your audience across all your social media channels like Facebook, Instagram, YouTube, and more.',
  },
  {
    icon: '🤖',
    title: 'AI Content assistant',
    description: 'Supercharge your content creation with AI. Generate captions, hashtags, and ideas in seconds.',
    longDescription: 'Supercharge your content creation with AI. Generate captions, hashtags, and ideas in seconds.',
  },
  {
    icon: '🎨',
    title: 'Design it with AI',
    description: 'Create stunning visuals for your social media posts with AI. Generate images, edit photos, and design graphics effortlessly.',
    longDescription: 'Create stunning visuals for your social media posts with AI. Generate images, edit photos, and design graphics effortlessly.',
  },
  {
    icon: '👥',
    title: 'Teamwork organization',
    description: 'Manage your social media team and collaborate seamlessly. Assign roles, track progress, and approve content with ease.',
    longDescription: 'Manage your social media team and collaborate seamlessly. Assign roles, track progress, and approve content with ease.',
  },
  {
    icon: '⚡',
    title: 'Auto actions',
    description: 'Boost your engagement and save time with automated actions. Schedule replies, follow-ups, and more.',
    longDescription: 'Boost your engagement and save time with automated actions. Schedule replies, follow-ups, and more.',
  },
  {
    icon: '📊',
    title: 'Comprehensive analytics',
    description: 'Track your performance and understand your audience. Get detailed insights into your reach, engagement, and growth.',
    longDescription: 'Track your performance and understand your audience. Get detailed insights into your reach, engagement, and growth.',
  },
  {
    icon: '🔄',
    title: 'Automate everything',
    description: 'Save time and resources with automated workflows. Schedule posts, manage campaigns, and analyze results with AI.',
    longDescription: 'Save time and resources with automated workflows. Schedule posts, manage campaigns, and analyze results with AI.',
  },
];

const targetAudiences = [
  {
    icon: '😍',
    title: 'Creators',
    description: 'Streamline your content creation and scheduling for maximum reach and engagement every week.',
  },
  {
    icon: '💼',
    title: 'Business',
    description: 'Expand brand reach and boost marketing impact with tailored post scheduling.',
  },
  {
    icon: '🏢',
    title: 'Agencies',
    description: 'Easily manage multiple client accounts for increased productivity and better results.',
  },
];

const statistics = [
  { metric: 'x2 More Reach' },
  { metric: 'x4 More Followers' },
  { metric: '+15% More Sales' },
  { metric: '+50% More Traffic' },
  { metric: '+3k More Leads' },
  { metric: '+2k More Subscribers' },
  { metric: '2x More Engagement' },
  { metric: '+10% More Conversions' },
  { metric: '+15% More Productivity' },
  { metric: '3x Faster Growth' },
];

const awards = [
  { title: '#1 Product of the Month' },
  { title: '#1 Product of the Week' },
  { title: '#1 Product of the Day' },
];

const faqs = [
  {
    question: 'What channels does PosteaHora support?',
    answer: 'The platform supports X (Twitter), Instagram, Facebook, Threads, LinkedIn, YouTube, TikTok, Reddit, Pinterest, Dribbble, Discord, Slack, Mastodon, Bluesky, Lemmy, Warpcast, Telegram, Nostr, VK, Medium, DevTo, Hashnode, WordPress, and more.',
  },
  {
    question: 'What kind of payment methods are supported by PosteaHora?',
    answer: 'We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through our payment partners.',
  },
  {
    question: 'Can I trust PosteaHora?',
    answer: 'Absolutely! PosteaHora is trusted by thousands of users worldwide. We use industry-standard security measures to protect your data and ensure your privacy.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day free trial with no credit card required. If you\'re not satisfied within the first 30 days of your paid subscription, we offer a full refund.',
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-newBgColor rounded-xl border border-newBlockSeparator overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-newBoxHover transition-colors gap-4"
      >
        <span className="font-semibold text-lg pr-4 flex-1 min-w-0">{question}</span>
        <span
          className={clsx(
            'text-newBtnPrimary text-2xl font-light transition-transform flex-shrink-0 w-8 h-8 flex items-center justify-center',
            isOpen && 'rotate-45'
          )}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-newTextItemBlur">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const LandingPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-newBgColor text-newTextColor">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-newBgColorInner/80 backdrop-blur-sm border-b border-newBlockSeparator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 flex-shrink-0">
              <Logo />
              <span className="text-xl font-semibold whitespace-nowrap">PosteaHora</span>
            </div>
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center px-4 min-w-0">
              <Link
                href="#features"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors whitespace-nowrap flex-shrink-0"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors whitespace-nowrap flex-shrink-0"
              >
                Pricing
              </Link>
              <Link
                href="#blog"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors whitespace-nowrap flex-shrink-0"
              >
                Blog
              </Link>
              <Link
                href="#help"
                className="text-newTextItemBlur hover:text-newTextColor transition-colors whitespace-nowrap flex-shrink-0"
              >
                Help
              </Link>
            </div>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Your agentic social media
              <br />
              <span className="relative inline-block">
                scheduling tool
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-newBtnPrimary/30 -z-10"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-newTextItemBlur max-w-3xl mx-auto mb-8">
              PosteaHora offers an intuitive platform to manage your social media posts, build an AI-driven content strategy, and grow your online presence with AI.
            </p>
            <div className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-newBtnPrimary/20 to-newBtnPrimary/10 rounded-2xl border border-newBtnPrimary/30 p-8 max-w-6xl mx-auto">
                <div className="text-center text-newTextItemBlur mb-4">
                  <div className="text-sm font-semibold text-newBtnPrimary mb-2">
                    Schedule and generate posts with AI
                  </div>
                  <div className="h-64 bg-newBgColorInner rounded-lg flex items-center justify-center border border-newBlockSeparator">
                    <div className="text-newTextItemBlur">Dashboard Preview</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-12 max-w-5xl mx-auto">
              {socialChannels.slice(0, 20).map((channel) => (
                <div
                  key={channel.name}
                  className="p-3 bg-newBgColorInner rounded-lg border border-newBlockSeparator hover:border-newBtnPrimary/50 transition-colors flex items-center justify-center aspect-square"
                >
                  <ImageWithFallback
                    fallbackSrc={`/icons/platforms/${channel.icon}.png`}
                    src={`/icons/platforms/${channel.icon}.png`}
                    alt={channel.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth"
                className="px-8 py-4 bg-newBtnPrimary text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-newBgColorInner">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Subscribe to the Newsletter</h2>
          <p className="text-newTextItemBlur mb-6">For exclusive content, tips, and news.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle newsletter subscription
              alert('Thank you for subscribing!');
              setEmail('');
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-newBgColor border border-newBlockSeparator rounded-lg focus:outline-none focus:border-newBtnPrimary text-newTextColor"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-newBtnPrimary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-newBgColorInner p-6 rounded-xl border border-newBlockSeparator text-center"
              >
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold">{award.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-newBgColorInner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Trusted by customers all over the world
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-gradient-to-br from-newBtnPrimary/20 to-newBtnPrimary/10 border border-newBtnPrimary/30 backdrop-blur-sm"
              >
                <div className="text-xl font-bold text-newTextColor">{stat.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Who is PosteaHora for?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <div
                key={index}
                className="bg-newBgColorInner p-8 rounded-xl border border-newBlockSeparator hover:border-newBtnPrimary/50 transition-colors text-center"
              >
                <div className="text-5xl mb-4">{audience.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{audience.title}</h3>
                <p className="text-newTextItemBlur">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-newBgColorInner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            All the tools required for social media growth in one place
          </h2>
          <div className="mt-16 space-y-24">
            {features.slice(0, 7).map((feature, index) => (
              <div
                key={index}
                className={clsx(
                  'grid md:grid-cols-2 gap-12 items-center',
                  index % 2 === 1 && 'md:grid-flow-dense'
                )}
              >
                <div
                  className={clsx(
                    index % 2 === 1 && 'md:col-start-2',
                    'flex flex-col justify-center'
                  )}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-newTextItemBlur">{feature.longDescription}</p>
                </div>
                <div
                  className={clsx(
                    index % 2 === 1 && 'md:col-start-1 md:row-start-1',
                    'bg-newBgColor rounded-xl border border-newBlockSeparator p-8 min-h-[300px] flex items-center justify-center'
                  )}
                >
                  <div className="text-center text-newTextItemBlur">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <p className="text-sm">Feature Preview</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Channels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Wide list of trending social media channels
          </h2>
          <p className="text-center text-newTextItemBlur mb-12">
            Integrate with dozens of social media channels, including Facebook, Instagram, YouTube, TikTok, Twitter, LinkedIn, and more.
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {socialChannels.map((channel) => (
              <div
                key={channel.name}
                className="bg-newBgColorInner p-4 rounded-lg border border-newBlockSeparator hover:border-newBtnPrimary/50 transition-all hover:scale-105 text-center flex flex-col items-center justify-center min-h-[100px]"
              >
                <div className="w-8 h-8 flex items-center justify-center mb-2 flex-shrink-0">
                  <ImageWithFallback
                    fallbackSrc={`/icons/platforms/${channel.icon}.png`}
                    src={`/icons/platforms/${channel.icon}.png`}
                    alt={channel.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="text-xs font-medium">{channel.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-newBgColorInner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <Link
            href="/auth"
            className="inline-block px-8 py-4 bg-newBtnPrimary text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Wall of Love Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Wall of love <span className="text-newBtnPrimary">❤️</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Content Creator',
                text: 'PosteaHora has completely transformed how I manage my social media. The AI features are incredible!',
              },
              {
                name: 'Michael Chen',
                role: 'Marketing Director',
                text: 'We\'ve seen a 200% increase in engagement since using PosteaHora. Highly recommend!',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Agency Owner',
                text: 'Managing multiple client accounts has never been easier. The collaboration features are game-changing.',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-newBgColorInner p-6 rounded-xl border border-newBlockSeparator"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-newBtnPrimary/20 flex items-center justify-center font-semibold flex-shrink-0 text-base leading-none">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{testimonial.name}</div>
                    <div className="text-sm text-newTextItemBlur truncate">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-newTextItemBlur">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-newBtnPrimary/20 to-newBtnPrimary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <Link
            href="/auth"
            className="inline-block px-8 py-4 bg-newBtnPrimary text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-newBgColorInner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-newBlockSeparator bg-newBgColorInner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 flex-shrink-0">
              <Logo />
              <span className="text-2xl font-semibold whitespace-nowrap">PosteaHora</span>
            </div>
            <p className="text-newTextItemBlur mb-6">Connect with us on social media</p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'x', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-newBgColor border border-newBlockSeparator flex items-center justify-center hover:border-newBtnPrimary/50 transition-colors flex-shrink-0"
                  aria-label={social}
                >
                  <ImageWithFallback
                    fallbackSrc={`/icons/platforms/${social}.png`}
                    src={`/icons/platforms/${social}.png`}
                    alt={social}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-newTextItemBlur">
                <li>
                  <Link href="/" className="hover:text-newTextColor transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-newTextColor transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-newTextColor transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#blog" className="hover:text-newTextColor transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#help" className="hover:text-newTextColor transition-colors">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-newTextItemBlur">
                <li>
                  <Link href="/about" className="hover:text-newTextColor transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-newTextColor transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-newTextColor transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-newTextColor transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-newTextItemBlur">
                <li>
                  <Link href="/terms" className="hover:text-newTextColor transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-newTextColor transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-newBlockSeparator text-center text-newTextItemBlur text-sm">
            <p>© 2024 PosteaHora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

