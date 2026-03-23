import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import type { AppError, ErrorType } from '../types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorType: ErrorType;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Determine error type
    let errorType: ErrorType = 'unknown';
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
      errorType = 'network';
    } else if (error.message.includes('wallet') || error.message.includes('provider')) {
      errorType = 'wallet';
    } else if (error.message.includes('contract') || error.message.includes('call')) {
      errorType = 'contract';
    } else if (error.message.includes('transaction') || error.message.includes('gas')) {
      errorType = 'transaction';
    }

    return {
      hasError: true,
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Log to analytics in production
    if (import.meta.env.PROD) {
      // analytics.track('error', { message: error.message, stack: error.stack });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown',
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  getErrorMessage(): { title: string; message: string; icon: ReactNode } {
    const { errorType, error } = this.state;
    
    switch (errorType) {
      case 'network':
        return {
          title: 'Connection Lost',
          message: 'Unable to connect to the blockchain network. Please check your internet connection and try again.',
          icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
        };
      case 'wallet':
        return {
          title: 'Wallet Error',
          message: 'There was a problem with your wallet connection. Please make sure your wallet is unlocked and try again.',
          icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
        };
      case 'contract':
        return {
          title: 'Smart Contract Error',
          message: 'The smart contract returned an error. This might be due to network congestion or contract restrictions.',
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
        };
      case 'transaction':
        return {
          title: 'Transaction Failed',
          message: 'Your transaction could not be completed. Please check your gas settings and try again.',
          icon: <AlertTriangle className="w-16 h-16 text-purple-500" />,
        };
      default:
        return {
          title: 'System Failure',
          message: error?.message || 'Something went wrong. Our team has been notified.',
          icon: <Bug className="w-16 h-16 text-cyber-cyan" />,
        };
    }
  }

  render() {
    if (this.state.hasError) {
      const { title, message, icon } = this.getErrorMessage();
      
      return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Comic-style error panel */}
            <div className="comic-panel bg-dark-card p-8 rounded-xl">
              {/* Error icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {icon}
                  <div className="absolute inset-0 animate-pulse opacity-50">
                    {icon}
                  </div>
                </div>
              </div>
              
              {/* Error title */}
              <h1 className="font-comic text-4xl text-center text-white mb-4 glitch" data-text={title}>
                {title}
              </h1>
              
              {/* Error message */}
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                {message}
              </p>
              
              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={this.handleReload}
                    className="flex-1 btn-secondary"
                  >
                    Reload Page
                  </button>
                  
                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </button>
                </div>
              </div>
              
              {/* Debug info (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mt-6 p-4 bg-black/50 rounded-lg overflow-auto">
                  <p className="text-xs text-gray-500 font-mono mb-2">Debug Info:</p>
                  <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}
            </div>
            
            {/* Halftone decoration */}
            <div className="absolute inset-0 halftone opacity-5 pointer-events-none" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  const handleError = (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught:', error, errorInfo);
    // Could send to error tracking service
  };

  return { handleError };
}

export default ErrorBoundary;
