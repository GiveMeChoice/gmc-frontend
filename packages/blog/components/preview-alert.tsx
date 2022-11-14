import React from 'react';
import { Container } from './container';

export const PreviewAlert: React.FC = () => {
  return (
    <div className="bg-accent-7 border-accent-7 border-b bg-black text-primary">
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            This page is a preview.{' '}
            <a
              href="/api/exit-preview"
              className="hover:text-cyan underline transition-colors duration-200"
            >
              Click here
            </a>{' '}
            to exit preview mode.
          </>
        </div>
      </Container>
    </div>
  );
};
