import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp, ShieldAlert, Bug } from 'lucide-react';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  name?: string;
  variant?: 'fullscreen' | 'section' | 'card';
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    // Structured logging for diagnostics
    console.error(`[ErrorBoundary: ${this.props.name || 'Application'}] Uncaught component exception:`, {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  toggleDetails = (): void => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const { fallback, name = 'Section', variant = 'section' } = this.props;
      const { error, errorInfo, showDetails } = this.state;

      // Custom user-provided fallback
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error || new Error('Unknown error'), this.handleReset);
        }
        return fallback;
      }

      // 1. Fullscreen Root Application Error Fallback
      if (variant === 'fullscreen') {
        return (
          <div
            id="error-boundary-fullscreen"
            className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans select-none"
          >
            <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Something went wrong
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  An unexpected error occurred in <span className="text-amber-400 font-semibold">{name}</span>. The issue has been logged and the rest of the application remains protected.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  id="error-boundary-retry-btn"
                  onClick={this.handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>

                <button
                  id="error-boundary-home-btn"
                  onClick={() => {
                    window.location.href = '/';
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Reload Website</span>
                </button>
              </div>

              {/* Technical Details Toggle */}
              {error && (
                <div className="pt-2 text-left border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={this.toggleDetails}
                    className="flex items-center justify-between w-full text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Bug className="w-3.5 h-3.5 text-amber-400" />
                      <span>Technical Diagnostics</span>
                    </span>
                    {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showDetails && (
                    <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-red-300 space-y-2 overflow-x-auto max-h-48">
                      <p className="font-bold text-red-400">{error.name}: {error.message}</p>
                      {errorInfo && (
                        <pre className="text-[10px] text-slate-400 whitespace-pre-wrap">
                          {errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      // 2. Section / Tab Level Error Fallback (for Admin Tabs or Public Sections)
      return (
        <div
          id={`error-boundary-${name.toLowerCase().replace(/\s+/g, '-')}`}
          className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 rounded-3xl p-6 sm:p-8 my-4 shadow-sm space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Unable to load {name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  An error occurred while displaying this section. Other sections of the portal remain operational.
                </p>
              </div>
            </div>

            <button
              onClick={this.handleReset}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Section</span>
            </button>
          </div>

          {error && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={this.toggleDetails}
                className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium cursor-pointer"
              >
                <span>{showDetails ? 'Hide error details' : 'Show error details'}</span>
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showDetails && (
                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-red-600 dark:text-red-400 overflow-x-auto">
                  <p className="font-semibold">{error.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
