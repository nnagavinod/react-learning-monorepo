import { Panel, Badge } from 'rsuite';
import { TaskStats as TaskStatsType } from '../types/task.types';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Panel
        bordered
        className="bg-linear-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow duration-200"
      >
        <div className="text-center p-2">
          <Badge content={stats.total} className="mb-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto"></div>
          </Badge>
          <h3 className="text-lg font-semibold text-gray-800 mt-3">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
        </div>
      </Panel>

      <Panel
        bordered
        className="bg-linear-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow duration-200"
      >
        <div className="text-center p-2">
          <Badge content={stats.active} className="mb-2">
            <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto"></div>
          </Badge>
          <h3 className="text-lg font-semibold text-gray-800 mt-3">
            Active Tasks
          </h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {stats.active}
          </p>
        </div>
      </Panel>

      <Panel
        bordered
        className="bg-linear-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow duration-200"
      >
        <div className="text-center p-2">
          <Badge content={stats.completed} className="mb-2">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto"></div>
          </Badge>
          <h3 className="text-lg font-semibold text-gray-800 mt-3">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.completed}
          </p>
        </div>
      </Panel>
    </div>
  );
};
