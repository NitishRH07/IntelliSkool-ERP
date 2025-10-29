import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add comprehensive error logging
console.log("index.tsx: Script loaded");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("index.tsx: Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

console.log("index.tsx: Root element found", rootElement);

// Add error boundary to catch rendering errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("ErrorBoundary: Error caught by boundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary: Error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log("ErrorBoundary: Rendering error fallback UI");
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Application Error</h2>
            <p className="text-gray-700 mb-4">Something went wrong while loading the application.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log("index.tsx: Creating root");
const root = ReactDOM.createRoot(rootElement);

console.log("index.tsx: Rendering App component");
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log("index.tsx: Rendering completed");