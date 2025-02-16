"use client"

export default function Dictionary() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-8 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dictionary
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Add words that you want Flow to remember
          </p>
        </div>
      </div>
    </div>
  );
}

