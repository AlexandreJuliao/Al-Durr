"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 79;

export default function HeroAnimation() {
    const { t } = useLanguage();
    const triggerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const annotationsRef = useRef<HTMLDivElement[]>([]);

    // Annotations Refs
    const phase1Ref = useRef<HTMLDivElement>(null);
    const phase2Ref = useRef<HTMLDivElement>(null);
    const phase3Ref = useRef<HTMLDivElement>(null);

    // Track mount state
    const isMounted = useRef(true);

    // Preload images
    useEffect(() => {
        isMounted.current = true;
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `/hero-sequence-v2/frame_${i.toString().padStart(3, "0")}.png`;
                loadedImages.push(img);
            }

            imagesRef.current = loadedImages;

            // Render first frame immediately
            if (loadedImages[0]) {
                loadedImages[0].onload = () => {
                    if (isMounted.current) renderFrame(0);
                };
            }
        };

        loadImages();

        return () => {
            isMounted.current = false;
        };
    }, []);

    // State for logical phases (0, 1, 2)
    const phaseRef = useRef(0);
    const isLockedRef = useRef(false);
    const isAnimatingRef = useRef(false);

    // TRAP STATE: Starts TRUE. The user is trapped until they finish.
    const isTrappedRef = useRef(true);

    // Draw frame to canvas
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        // Safety check for array bounds
        const img = imagesRef.current[index] || imagesRef.current[0];
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Focal point configuration (Right Side Desktop, Center Mobile)
        const isDesktop = canvas.width > 768;
        const FOCUS_X = isDesktop ? 0.75 : 0.5;
        const FOCUS_Y = isDesktop ? 0.55 : 0.5; // Center vertically in local canvas space

        const effectiveWidth = isDesktop ? canvas.width * 0.55 : canvas.width;
        const hRatio = effectiveWidth / img.width;
        const vRatio = (canvas.height * (isDesktop ? 0.8 : 0.9)) / img.height; // Use more height on mobile
        const ratio = Math.min(hRatio, vRatio);

        const centerX = canvas.width * FOCUS_X;
        const centerY = canvas.height * FOCUS_Y;

        const drawX = centerX - (img.width * ratio) / 2;
        const drawY = centerY - (img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            drawX,
            drawY,
            img.width * ratio,
            img.height * ratio
        );
    };

    useLayoutEffect(() => {
        annotationsRef.current = [phase1Ref.current!, phase2Ref.current!, phase3Ref.current!];
        const phases = annotationsRef.current;
        const sequence = { frame: 0 };


        // Initial State
        renderFrame(0);
        gsap.set(phases[0], { opacity: 1, y: 0 });
        gsap.set(phases[1], { opacity: 0, y: 20 });
        gsap.set(phases[2], { opacity: 0, y: 20 });

        // Force scroll to top on mount
        window.scrollTo(0, 0);

        // --- LOCKING MECHANISM ---
        const lockScroll = () => {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        };

        const unlockScroll = () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };

        // Activate Lock immediately
        lockScroll();

        // --- ANIMATION LOGIC ---
        const animateToPhase = (targetPhase: number) => {
            isAnimatingRef.current = true;

            const targetFrame = targetPhase === 0 ? 0 : targetPhase === 1 ? 40 : FRAME_COUNT - 1;

            gsap.to(sequence, {
                frame: targetFrame,
                duration: 3, // Slower, more cinematic (was 2)
                ease: "power1.inOut", // Gentler acceleration (was power2)
                onUpdate: () => renderFrame(Math.round(sequence.frame)),
                onComplete: () => {
                    isAnimatingRef.current = false;
                }
            });

            phases.forEach((el, i) => {
                if (i === targetPhase) {
                    // Slower fade in
                    gsap.to(el, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 });
                } else {
                    // Slower fade out
                    gsap.to(el, { opacity: 0, y: -20, duration: 1 });
                }
            });
        };

        // --- CORE INPUT HANDLER ---
        const handleInput = (direction: 1 | -1) => {
            if (isAnimatingRef.current || isLockedRef.current) return;

            const currentPhase = phaseRef.current;

            if (direction === 1) { // NEXT / DOWN
                if (currentPhase < 2) {
                    const nextPhase = currentPhase + 1;
                    phaseRef.current = nextPhase;

                    isLockedRef.current = true;
                    animateToPhase(nextPhase);

                    setTimeout(() => {
                        isLockedRef.current = false;
                    }, 4000); // 4s Lock

                } else {
                    // RELEASE
                    isTrappedRef.current = false;
                    unlockScroll();
                }
            } else { // PREV / UP
                if (currentPhase > 0) {
                    const prevPhase = currentPhase - 1;
                    phaseRef.current = prevPhase;
                    animateToPhase(prevPhase);
                }
            }
        };

        // Helper to prevent default scroll behavior
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        };

        // --- EVENT LISTENERS ---

        // 1. Wheel / Trackpad
        const handleWheel = (e: WheelEvent) => {
            const direction = e.deltaY > 0 ? 1 : -1;

            if (!isTrappedRef.current) {
                // Re-trap if top
                if (window.scrollY === 0 && direction === -1) {
                    isTrappedRef.current = true;
                    lockScroll();
                    preventScroll(e);
                }
                return;
            }

            preventScroll(e);
            handleInput(direction);
        };

        // 2. Keyboard (Arrows, Space)
        const handleKey = (e: KeyboardEvent) => {
            if (!isTrappedRef.current) return;

            const keys = ["ArrowUp", "ArrowDown", " ", "PageUp", "PageDown", "Home", "End"];
            if (keys.includes(e.key)) {
                preventScroll(e);

                if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
                    handleInput(1);
                } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                    handleInput(-1);
                }
            }
        };

        // 3. Touch (Mobile Swipes)
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isTrappedRef.current) return;

            // Allow default ONLY if we are released (handled by !isTrapped check above)
            // If trapped, block EVERYTHING
            preventScroll(e);

            // We don't trigger per-pixel move, we wait for a swipe gesture?
            // Actually, for simplicity, let's just trigger on significant move and debounce
            // But implementing swipe logic here is complex without debounce. 
            // For now, PREVENT scroll is the priority.
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isTrappedRef.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            // Swipe Threshold
            if (Math.abs(deltaY) > 50) {
                const direction = deltaY > 0 ? 1 : -1;
                handleInput(direction);
            }
        };


        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKey, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.round(sequence.frame));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            unlockScroll();
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div ref={triggerRef} className="relative h-screen w-full bg-aldurr-canvas text-white overflow-hidden selection:bg-aldurr-accent/30">

            {/* 
                   Sticky Container: This stays PINNED (visually) while we scroll the parent.
                   We use standard CSS sticky here for simplicity/performance 
                   coupled with GSAP scrub on the parent trigger.
                */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Dynamic Backgrounds */}
                <div className="absolute inset-0 bg-aldurr-canvas">
                    {/* Geometric A-Frame/Triangle Pattern Overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="a-frame-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M50 0 L100 100 L0 100 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#a-frame-grid)" />
                    </svg>

                    {/* Animated Gradient Mesh */}
                    <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#16332B] blur-[120px] mix-blend-screen animate-pulse duration-[10s]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[80vw] rounded-full bg-[#112b25] blur-[130px] mix-blend-screen animate-pulse delay-1000 duration-[15s]" />
                </div>

                {/* Canvas Layer */}
                <div className="absolute inset-0 z-0 md:h-full h-[50vh] bottom-0 md:top-0">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 
                       Annotations Layer 
                       These are overlaid and animated by GSAP
                    */}
                {/* Annotations Layer */}
                <div className="absolute inset-0 z-20 pointer-events-none">

                    {/* ... (Kept existing annotations logic, but might need mobile tweaks) ... */}
                    {/* For now, let's keep them as is, they are absolute positioned based on % which might look okay on the half-canvas if we adjust the canvas render logic, but user specifically asked for "House Bottom". 
                        If the canvas is squashed to bottom 50%, the relative % annotations might be off. 
                        Let's start by just moving the text content to the top.
                    */}

                    {/* PHASE 1: STRUTURA */}
                    <div ref={phase1Ref} className="absolute inset-0 opacity-0">
                        {/* We will hide annotations on mobile for now to clean up, or keep them if they fit. 
                             Let's keep them but we might need to adjust top/left for mobile. 
                             Actually, looking at the code, they use % of the WHOLE screen. 
                             If canvas is at bottom, we need to offset annotations?
                             No, 'absolute inset-0' covers the whole screen. 
                             If the house is at the bottom, annotations should be there too.
                         */}
                        <div className="absolute top-[60%] md:top-[18%] left-[10%] md:left-[55%] flex flex-col items-center">
                            <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Estrutura Principal</div>
                            <div className="text-white text-sm font-light leading-tight whitespace-nowrap mb-2">Pinho Nórdico Certificado</div>
                            <div className="hidden md:block w-[1px] h-12 bg-aldurr-accent/50 relative">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-aldurr-accent" />
                            </div>
                        </div>

                        <div className="absolute top-[85%] md:top-[72%] left-[60%] md:left-[68%] flex flex-col items-center">
                            <div className="hidden md:block w-[1px] h-12 bg-aldurr-accent/50 relative mb-2">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-aldurr-accent" />
                            </div>
                            <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Fundação</div>
                            <div className="text-white text-sm font-light leading-tight whitespace-nowrap">Base Sólida</div>
                        </div>
                    </div>

                    {/* PHASE 2: SHELL */}
                    <div ref={phase2Ref} className="absolute inset-0 opacity-0">
                        <div className="absolute top-[75%] md:top-[48%] left-[60%] md:left-[65%] flex flex-col items-center">
                            <div className="text-center">
                                <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Exterior</div>
                                <div className="text-white text-sm font-light leading-tight whitespace-nowrap mb-2">Telha Asfáltica</div>
                            </div>
                        </div>

                        <div className="absolute top-[70%] md:top-[45%] left-[10%] md:left-[78%] flex flex-row items-center gap-4">
                            <div className="hidden md:block w-24 h-[1px] bg-aldurr-accent/50 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aldurr-accent" />
                            </div>
                            <div className="text-left">
                                <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Interior</div>
                                <div className="text-white text-sm font-light leading-tight whitespace-nowrap">Isolamento Térmico</div>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 3: FINISH */}
                    <div ref={phase3Ref} className="absolute inset-0 opacity-0">
                        <div className="absolute top-[80%] md:top-[62%] left-[10%] md:left-[22%] flex flex-row items-center gap-4">
                            <div className="text-right">
                                <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Acabamento</div>
                                <div className="text-white text-sm font-light leading-tight whitespace-nowrap">Madeira Tratada</div>
                            </div>
                        </div>

                        <div className="absolute top-[65%] md:top-[40%] left-[60%] md:left-[82%] flex flex-row items-center gap-4">
                            <div className="text-left">
                                <div className="text-aldurr-accent text-[10px] font-bold tracking-widest uppercase mb-1 whitespace-nowrap">Iluminação</div>
                                <div className="text-white text-sm font-light leading-tight whitespace-nowrap">Vidro Panorâmico</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Static Content Overlay (Left Side Specs) */}
                <div className="absolute inset-0 z-40 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 h-full pointer-events-none">
                    {/* Mobile: Top Half (Text) | Desktop: Left Side */}
                    <div className="relative flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0 h-[50vh] md:h-full z-50 pointer-events-auto">
                        <div className="relative w-full max-w-md pl-0 md:pl-0 text-center md:text-left">

                            <div className="flex flex-col gap-6 md:gap-10 items-center md:items-start">
                                {/* Major Highlights */}
                                <div className="flex flex-row items-baseline justify-center md:justify-start gap-6 md:gap-8">
                                    <div className="group flex flex-col cursor-default">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-4xl md:text-7xl font-bold text-[#C69C6D] tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                                                4
                                            </span>
                                            <span className="text-xl md:text-3xl text-white/40 font-light">Meses</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/50 uppercase group-hover:text-white transition-colors pl-1">
                                            Chave na Mão
                                        </span>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="w-[1px] h-14 bg-aldurr-honey/30 self-center" />

                                    <div className="group flex flex-col cursor-default">
                                        <div className="flex items-baseline gap-1 mb-1">
                                            <span className="text-4xl md:text-7xl font-bold text-[#C69C6D] tracking-tighter group-hover:scale-105 transition-transform duration-300 origin-left">
                                                149.900
                                            </span>
                                            <span className="text-xl md:text-3xl text-white/40 font-light">€</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/50 uppercase group-hover:text-white transition-colors pl-1">
                                            Desde
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-white/10" />

                                <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
                                    {[
                                        { text: "Zero Manutenção • Materiais Anti-Corrosão", tag: "Garantia" },
                                        { text: "Personalização Total • Layout T-Multi", tag: "Flexible" },
                                        { text: "Design A-Frame • Arquitetura Icónica", tag: "Design" }
                                    ].map((item, i) => (
                                        <div key={i} className="group flex items-center gap-4 text-white/60 font-light hover:text-white transition-colors duration-300 cursor-default">
                                            <div className="w-1.5 h-1.5 rounded-full bg-aldurr-accent/40 group-hover:bg-aldurr-accent group-hover:scale-150 transition-all duration-300" />
                                            <span className="tracking-wide text-xs md:text-lg">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative mt-4 group w-fit">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-aldurr-accent/50 to-purple-500/30 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500" />
                                    <button className="relative flex items-center gap-6 pl-8 pr-2 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 group">
                                        <span className="flex flex-col items-start mr-4 text-left">
                                            <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-0.5">Ready to Build?</span>
                                            <span className="text-xs md:text-sm text-white font-medium tracking-wide">Pedir Orçamento Exclusivo</span>
                                        </span>
                                        <span className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-lg shadow-white/10">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
