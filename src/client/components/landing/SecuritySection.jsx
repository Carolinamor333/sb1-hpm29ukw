import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheckIcon, LockClosedIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Smart Contract Security',
    description: 'Every transaction is secured by Ethereum smart contracts, ensuring transparency and immutability'
  },
  {
    icon: LockClosedIcon,
    title: 'Encrypted Data',
    description: 'All sensitive information is encrypted and stored securely on the blockchain'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Automated Verification',
    description: 'AI-powered systems verify transactions and detect potential fraud attempts'
  }
];

export default function SecuritySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your supply chain data is protected by industry-leading security measures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}