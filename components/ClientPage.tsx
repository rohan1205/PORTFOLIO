"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import Desktop from "@/components/Desktop";
import { OSProvider } from "@/components/OSProvider";

export default function ClientPage() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <OSProvider>
      <main className="w-full h-screen overflow-hidden relative bg-background">
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

        {bootComplete && <Desktop />}
      </main>
    </OSProvider>
  );
}
