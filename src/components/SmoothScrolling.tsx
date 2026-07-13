"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Scrolls to #anchor targets.
// - Landing on a NEW page (e.g. "Ver Detalhes" → /modelos#model): jump INSTANTLY,
//   so the page opens already at the model instead of a slow 1s auto-scroll (which
//   reads as lag). - In-page hash clicks (same route): keep a quick smooth glide.
function HashScroll() {
    const lenis = useLenis();
    const pathname = usePathname();

    useEffect(() => {
        // Absolute Y of the hash target, accounting for the fixed navbar.
        const targetY = () => {
            const hash = window.location.hash;
            if (!hash || hash.length < 2) return null;
            const el = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (!el) return null;
            return Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 96));
        };

        // Instant landing: native scroll is what reliably sticks here; also sync
        // Lenis's internal target so later user scrolling starts from the right place.
        const landInstant = () => {
            const y = targetY();
            if (y == null) return;
            window.scrollTo(0, y);
            if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
        };

        // Force the landing across a few frames (Links use scroll={false}, so Next
        // won't scroll; we own it) to beat nav-commit timing. Cancel on user input.
        let cancelled = false;
        let ticks = 0;
        let rafId = requestAnimationFrame(function loop() {
            if (cancelled) return;
            landInstant();
            if (++ticks < 6) rafId = requestAnimationFrame(loop);
        });
        const correct = setTimeout(() => { if (!cancelled) landInstant(); }, 350);
        const cancel = () => { cancelled = true; clearTimeout(correct); };
        window.addEventListener('wheel', cancel, { passive: true, once: true });
        window.addEventListener('touchstart', cancel, { passive: true, once: true });
        window.addEventListener('keydown', cancel, { once: true });

        // Same-page hash link clicks: quick smooth glide.
        const onHashChange = () => {
            const y = targetY();
            if (y == null) return;
            if (lenis) lenis.scrollTo(y, { duration: 0.6 });
            else window.scrollTo({ top: y, behavior: 'smooth' });
        };
        window.addEventListener('hashchange', onHashChange);

        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
            clearTimeout(correct);
            window.removeEventListener('wheel', cancel);
            window.removeEventListener('touchstart', cancel);
            window.removeEventListener('keydown', cancel);
            window.removeEventListener('hashchange', onHashChange);
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

