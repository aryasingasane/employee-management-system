import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your application preferences
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Appearance
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-100">
                Choose your preferred theme
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="relative w-20 h-10 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              style={{
                backgroundColor: isDark ? "#3b82f6" : "#cbd5e1",
              }}
            >
              <span
                className="absolute top-1 left-1 w-8 h-8 bg-slate-50 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-lg"
                style={{
                  transform: isDark ? "translateX(40px)" : "translateX(0)",
                }}
              >
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Current theme:{" "}
              <span className="font-semibold">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
