"use client"

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-8 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Configure your application preferences
          </p>
        </div>
      </div>
    </div>
  );
}

