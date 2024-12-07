import { ChevronRightIcon } from '@heroicons/react/24/outline';

const recentProjects = [
  {
    title: 'Inventory Optimization',
    rate: '$50/hour',
    status: 'In Progress',
    type: 'Remote',
    description: 'Implementing automated inventory tracking system'
  },
  {
    title: 'Supplier Integration',
    rate: '$45/hour',
    status: 'Completed',
    type: 'Part-time',
    description: 'Setting up EDI connections with key suppliers'
  }
];

export default function RightPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          See all projects
        </button>
      </div>

      <div className="space-y-6">
        {recentProjects.map((project) => (
          <div
            key={project.title}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">{project.rate}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {project.status}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {project.type}
              </span>
            </div>
            
            <p className="text-sm text-gray-500">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}