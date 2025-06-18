'use client';

import React from 'react';

type ErrorBoundaryProps = {
  name: string;
  children: unknown; // Usando unknown em vez de any para melhor segurança de tipo
}

/**
 * Wrapper component that renders a component safely and shows an error message if it fails
 * Useful for isolating component-specific render issues
 */
const ErrorBoundaryWrapper = ({ name, children }: ErrorBoundaryProps) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return (
      <div className="p-4 m-2 border border-red-500 bg-red-50 text-red-900 rounded">
        <p className="font-bold">Error rendering {name}</p>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
};

export default ErrorBoundaryWrapper;
