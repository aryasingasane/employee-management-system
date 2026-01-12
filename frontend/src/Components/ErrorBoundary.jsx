import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md w-full rounded-xl bg-white dark:bg-slate-800 px-6 py-5 shadow-lg ring-1 ring-slate-200/80 dark:ring-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Something went wrong.
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              An unexpected error occurred while loading this page. You can try
              again.
            </p>
            <button
              onClick={this.handleRetry}
              className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
