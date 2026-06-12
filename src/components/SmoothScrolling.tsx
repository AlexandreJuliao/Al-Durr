"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Disable Lenis smooth scroll for backoffice dashboard to avoid height locking
    const isBackoffice = pathname?.startsWith('/backoffice');

    if (isBackoffice) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;

