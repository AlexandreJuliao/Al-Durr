"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FRAME_COUNT = 94;
const FRAME_PATH = "/hero-new/frame_";

export default function ProcessSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 40,
        restDelta: 0.001
    });

    // Animate frames smoothly across the entire scroll progress
    const frameIndex = useTransform(
        smoothProgress, 
        [0, 1.0], 
        [0, 93], 
        { clamp: true }
    );

    useEffect(() => {
        const loadImages = async () => {
            const loaded: HTMLImageElement[] = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `${FRAME_PATH}${i.toString().padStart(3, "0")}.jpg`;
                loaded.push(img);
            }
            imagesRef.current = loaded;

            if (loaded[0]) {
                loaded[0].onload = () => renderFrame(0);
            }
        };
        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[Math.floor(index)];
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Enhance visibility
        ctx.filter = 'brightness(1.1) contrast(1.1)';

        const isMobile = window.innerWidth < 768;
        
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;

        // On mobile, Math.max (cover) scales it too high, cropping the sides heavily.
        // Using hRatio * 1.35 fills the width much better while allowing us to see the whole animation bounds.
        const ratio = isMobile ? (hRatio * 1.35) : Math.max(hRatio, vRatio);

        // On desktop, shift right to avoid text. On mobile, shift slightly up to leave room for text.
        const centerShift_x = (canvas.width - img.width * ratio) / 2 + (isMobile ? 0 : canvas.width * 0.1); 
        const centerShift_y = (canvas.height - img.height * ratio) / 2 - (isMobile ? canvas.height * 0.15 : 0);

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    useEffect(() => {
        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [frameIndex]);

    const steps = [
        {
            id: "PHASE_01",
            title: t.process.step1Title,
            desc: t.process.step1Desc,
            time: "15 Dias",
            start: 0,
            end: 0.25
        },
        {
            id: "PHASE_02",
            title: t.process.step2Title,
            desc: t.process.step2Desc,
            time: "45 Dias",
            start: 0.25,
            end: 0.50
        },
        {
            id: "PHASE_03",
            title: t.process.step3Title,
            desc: t.process.step3Desc,
            time: "90 Dias",
            start: 0.50,
            end: 0.75
        },
        {
            id: "PHASE_04",
            title: t.process.step4Title,
            desc: t.process.step4Desc,
            time: "120 Dias",
            start: 0.75,
            end: 1.0
        }
    ];

    return (
        <section ref={sectionRef} className="relative h-[800vh] bg-aldurr-void overflow-visible">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
                />

                {/* Responsive Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-aldurr-void/90 md:from-aldurr-void/80 via-aldurr-void/40 md:via-transparent to-transparent opacity-90 z-10" />
                <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-aldurr-void via-aldurr-void/60 to-transparent z-10 opacity-100 lg:hidden" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-aldurr-void to-transparent z-10 opacity-70 hidden lg:block" />

                <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center">
                    <div className="max-w-4xl relative h-[50vh] md:h-[400px]">
                        {steps.map((step) => (
                            <StepItem
                                key={step.id}
                                step={step}
                                progress={smoothProgress}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4 z-30 hidden md:block">
                    {steps.map((step, i) => (
                        <ProgressDot
                            key={i}
                            active={smoothProgress}
                            range={[step.start, step.end]}
                        />
                    ))}
                </div>

                {/* Continue Scroll Indicator */}
                <ContinueIndicator progress={smoothProgress} />
            </div>
        </section>
    );
}

interface Step {
    id: string;
    title: string;
    desc: string;
    time: string;
    start: number;
    end: number;
}

function StepItem({ step, progress }: { step: Step, progress: MotionValue<number> }) {
    const { start, end } = step;
    const isLast = step.id === "PHASE_04";

    // Text visible points
    const textStart = start + 0.05;
    const textEnd = end - 0.05;

    // If it's the last step, don't fade out at the end
    const opacityRanges = isLast ? [start, textStart, 1.0] : [start, textStart, textEnd, end];
    const opacityValues = isLast ? [0, 1, 1] : [0, 1, 1, 0];

    const opacity = useTransform(progress, opacityRanges, opacityValues);
    const x = useTransform(progress, [start, textStart], [-40, 0]);
    const filter = useTransform(progress, [start, textStart], ["blur(10px)", "blur(0px)"]);

    return (
        <motion.div
            style={{ opacity, x, filter }}
            className="absolute bottom-10 md:top-0 left-0 w-full pointer-events-none"
        >
            <div className="flex flex-col gap-4 md:gap-6 px-6 md:px-0 max-w-xl">
                <div className="flex items-center gap-4">
                    <span className="text-aldurr-honey font-mono text-[10px] md:text-sm tracking-[0.3em] font-bold">
                        {step.id}
                    </span>
                    <div className="w-8 md:w-12 h-[1px] bg-aldurr-honey/30"></div>
                </div>

                <h2 className="text-3xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] font-outfit">
                    {step.title}
                </h2>

                <p className="text-sm md:text-xl text-white/60 font-light leading-relaxed max-w-md">
                    {step.desc}
                </p>

                <div className="flex items-center gap-6 pt-2 md:pt-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5 md:mb-1">Timeline</span>
                        <span className="text-aldurr-honey text-xs md:text-base font-bold tracking-wider">{step.time}</span>
                    </div>
                    <div className="w-[1px] h-6 md:h-8 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5 md:mb-1">Estado</span>
                        <span className="text-white text-xs md:text-base font-light tracking-wide italic">Em Execução...</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProgressDot({ active, range }: { active: MotionValue<number>, range: [number, number] }) {
    const opacity = useTransform(active, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0.2, 1, 1, 0.2]);
    const scale = useTransform(active, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0.8, 1.1, 1.1, 0.8]);

    return (
        <motion.div
            style={{ opacity, scale }}
            className="w-2.5 h-2.5 bg-aldurr-honey rounded-none"
        />
    );
}

function ContinueIndicator({ progress }: { progress: MotionValue<number> }) {
    const opacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    return (
        <motion.div 
            style={{ opacity }}
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
        >
            <div className="bg-aldurr-void/40 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/5 flex flex-col items-center gap-2">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/70 font-bold whitespace-nowrap">
                    Continue o scroll para avançar
                </span>
                <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-4 md:h-6 bg-aldurr-honey/50"
                />
            </div>
        </motion.div>
    );
}
