"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ProjectRoom3DCanvas = dynamic(
  () => import('./ProjectRoom3D'),
  {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-[#070A11]" />
  }
);

export default function HowYouLearnSection() {
  return <ProjectRoom3DCanvas />;
}
