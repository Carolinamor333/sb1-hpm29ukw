const prompts = [
  "Analyze my current inventory levels",
  "Predict demand for next month",
  "Identify low stock items",
  "Suggest optimal reorder quantities"
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 mb-3">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}