// Optivana Frontend - Alert Component
import React from 'react';
import { 
  InformationCircleIcon, 
  ExclamationIcon,
  CheckCircleIcon,
  XCircleIcon
} from './icons';

export const Alert = ({ variant = 'default', title, description, action }) => {
  const getAlertStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          title: 'text-green-800',
          description: 'text-green-700'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: <ExclamationIcon className="w-5 h-5 text-yellow-500" />,
          title: 'text-yellow-800',
          description: 'text-yellow-700'
        };
      case 'destructive':
        return {
          container: 'bg-red-50 border-red-200',
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
          title: 'text-red-800',
          description: 'text-red-700'
        };
      case 'default':
      default:
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
          title: 'text-blue-800',
          description: 'text-blue-700'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`rounded-lg border p-4 ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          {description && (
            <div className={`mt-2 text-sm ${styles.description}`}>
              <p>{description}</p>
            </div>
          )}
          {action && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className={`px-2 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    variant === 'destructive'
                      ? 'text-red-800 bg-red-100 hover:bg-red-200 focus:ring-red-600'
                      : variant === 'warning'
                      ? 'text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-600'
                      : variant === 'success'
                      ? 'text-green-800 bg-green-100 hover:bg-green-200 focus:ring-green-600'
                      : 'text-blue-800 bg-blue-100 hover:bg-blue-200 focus:ring-blue-600'
                  }`}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Using imported icons from ./icons.jsx
