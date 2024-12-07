import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    number: '01',
    title: 'Connect Your Wallet',
    description: 'Securely connect your blockchain wallet to enable smart contracts and automated payments'
  },
  {
    number: '02',
    title: 'Set Up Your Supply Chain',
    description: 'Add your suppliers, inventory items, and configure automated reordering thresholds'
  },
  {
    number: '03',
    title: 'Enable AI Optimization',
    description: 'Our AI analyzes your historical data to predict demand and optimize inventory levels'
  },
  {
    number: '04',
    title: 'Automate Operations',
    description: 'Smart contracts automatically execute payments and orders based on predefined conditions'
  }
];

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with ChainBuddy in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <span className="text-5xl font-bold text-blue-100 absolute -top-6 right-4">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 relative">
                  {step.title}
                </h3>
                <p className="text-gray-600 relative">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}