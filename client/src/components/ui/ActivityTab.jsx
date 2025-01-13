export const ActivityTab = ({ icon: Icon, label, count, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-gray-600" />
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      <span className="text-sm text-gray-500">({count})</span>
    </div>
    {children}
  </div>
);

export default ActivityTab;
