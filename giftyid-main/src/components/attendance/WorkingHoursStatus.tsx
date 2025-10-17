import React, { memo } from 'react';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useVietnamTime } from '@/hooks/useVietnamTime';

interface WorkingHoursStatusProps {
  className?: string;
}

const WorkingHoursStatus: React.FC<WorkingHoursStatusProps> = memo(({ className = '' }) => {
  const { getWorkingHoursStatus } = useVietnamTime();
  const status = getWorkingHoursStatus();

  const getStatusIcon = () => {
    if (status.isWorking) {
      return <FiCheckCircle className="text-green-500" />;
    } else {
      return <FiAlertTriangle className="text-orange-500" />;
    }
  };

  const getStatusColor = () => {
    if (status.isWorking) {
      return 'text-green-700 bg-green-50 border-green-200';
    } else {
      return 'text-orange-700 bg-orange-50 border-orange-200';
    }
  };

  return (
    <div className={`flex items-center p-3 rounded-lg border ${getStatusColor()} ${className}`}>
      <div className="flex-shrink-0 mr-3">
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {status.message}
        </p>
        <p className="text-xs opacity-75">
          Giờ làm việc: 8:00 - 18:00
        </p>
      </div>
    </div>
  );
});

WorkingHoursStatus.displayName = 'WorkingHoursStatus';

export default WorkingHoursStatus; 