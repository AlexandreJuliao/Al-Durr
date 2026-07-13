"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [reducedMotion, setReducedMotion] = useState(false);

    // Respect the OS "reduce motion" setting: fall back to native scrolling.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    // Disable Lenis smooth scroll for the backoffice dashboard (avoids height locking)
    // and for reduced-motion users.
    const isBackoffice = pathname?.startsWith('/backoffice');

    if (isBackoffice || reducedMotion) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, syncTouch: false }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;

