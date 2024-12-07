import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { useWeb3 } from '../hooks/useWeb3';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorks';
import SecuritySection from '../components/landing/SecuritySection';
import Footer from '../components/layout/Footer';

export default function Landing() {
  const { connectWallet, account, connecting } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CubeTransparentIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ChainBuddy</span>
            </div>
            <div className="flex items-center space-x-4">
              {account ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={connecting}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Supply Chain Management,{' '}
              <span className="text-blue-600">Reimagined</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Secure, transparent, and intelligent supply chain solutions powered by
              blockchain technology and artificial intelligence.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </Link>
              <a
                href="#features"
                className="px-8 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Security Section */}
      <SecuritySection />

      {/* Footer */}
      <Footer />
    </div>
  );
}