import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Something went wrong</h2>
                    <p className="error-message">
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <button className="btn-retry" onClick={this.handleRetry}>
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
