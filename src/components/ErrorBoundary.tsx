import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
                                <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
                        <p className="text-muted-foreground">
                            We apologize for the inconvenience. The application has encountered an unexpected error.
                        </p>
                        {this.state.error && (
                            <div className="p-4 bg-muted/50 rounded-md text-left text-sm font-mono overflow-auto max-h-40 my-4">
                                {this.state.error.message}
                            </div>
                        )}
                        <div className="flex gap-2 justify-center">
                            <Button onClick={() => window.location.reload()} variant="default">
                                Refresh Page
                            </Button>
                            <Button onClick={() => window.location.href = '/'} variant="outline">
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
