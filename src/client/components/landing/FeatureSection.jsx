import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CubeTransparentIcon,
  LightBulbIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure Transactions',
    description: 'Smart contracts ensure transparent and tamper-proof transactions between suppliers and buyers'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Automated Payments',
    description: 'Instant, secure payments triggered automatically when delivery conditions are met'
  },
  {
    icon: ChartBarIcon,
    title: 'AI-Powered Analytics',
    description: 'Machine learning algorithms predict demand and optimize inventory levels automatically'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Smart Inventory',
    description: 'Real-time tracking with automated reordering based on historical trends'
  },
  {
    icon: LightBulbIcon,
    title: 'Fraud Prevention',
    description: 'Blockchain verification prevents counterfeit products and ensures authenticity'
  },
  {
    icon: ClockIcon,
    title: 'Real-time Updates',
    description: 'Track shipments and inventory changes in real-time with instant notifications'
  }
];

export default function FeatureSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Revolutionizing Supply Chain Management
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leverage blockchain technology and artificial intelligence to create a
            secure, efficient, and automated supply chain ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}