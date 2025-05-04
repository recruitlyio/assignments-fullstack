import { Suspense } from 'react';
import ResumeParser from './resumeParser';

export default function ResumePage() {
    return (
      <Suspense fallback={<div>Loading resume...</div>}>
        <ResumeParser />
      </Suspense>
    );
  }