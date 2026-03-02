import React from "react";

interface GenericPageProps {
  title: string;
  description?: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-1 sm:mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-secondary-600 dark:text-gray-400">{description}</p>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-secondary-200/50 dark:border-primary-500/30 bg-white/70 dark:bg-charcoal-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-lg">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-primary-500/10 to-transparent dark:from-primary-500/15 rounded-full -mr-24 -mt-24 sm:-mr-32 sm:-mt-32"></div>
        <div className="relative text-center py-8 sm:py-12">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-white mb-3 sm:mb-4">
            {title} Content
          </h2>
          <p className="text-sm sm:text-base text-secondary-600 dark:text-gray-300 max-w-md mx-auto px-4">
            This is a placeholder page for {title}. Your content will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};
