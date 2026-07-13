"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Smoothly scrolls to #anchor targets across route changes and in-page hash links.
// Covers "Ver Detalhes" (home → /modelos#model) and CTAs like /contactos#contact-form.
function HashScroll() {
    const lenis = useLenis();
    const pathname = usePathname();

    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (!hash || hash.length < 2) return;
            const el = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (!el) return;
            if (lenis) {
                lenis.scrollTo(el, { offset: -96, duration: 1.1 });
            } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Wait a beat so layout/images settle after a route change before measuring.
        const t = setTimeout(scrollToHash, 140);
        window.addEventListener('hashchange', scrollToHash);
        return () => {
            clearTimeout(t);
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, [pathname, lenis]);

    return null;
}

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
            <HashScroll />
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;

