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

    const frameIndex = useTransform(smoothProgress, [0, 0.8], [0, FRAME_COUNT - 1], { clamp: true });

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

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const isMobile = window.innerWidth < 768;
        
        // On desktop, shift right to avoid text. On mobile, stay centered.
        const centerShift_x = (canvas.width - img.width * ratio) / 2 + (isMobile ? 0 : canvas.width * 0.1); 
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

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
            peak: 0.10,
            end: 0.20
        },
        {
            id: "PHASE_02",
            title: t.process.step2Title,
            desc: t.process.step2Desc,
            time: "45 Dias",
            start: 0.20,
            peak: 0.35,
            end: 0.45
        },
        {
            id: "PHASE_03",
            title: t.process.step3Title,
            desc: t.process.step3Desc,
            time: "90 Dias",
            start: 0.45,
            peak: 0.60,
            end: 0.70
        },
        {
            id: "PHASE_04",
            title: t.process.step4Title,
            desc: t.process.step4Desc,
            time: "120 Dias",
            start: 0.70,
            peak: 0.85,
            end: 1.0
        }
    ];

    return (
        <section ref={sectionRef} className="relative h-[500vh] bg-aldurr-void overflow-visible">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
                />

                {/* Responsive Gradients: Stronger background on mobile to pop text */}
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-aldurr-void/90 md:from-aldurr-void/80 via-aldurr-void/40 md:via-transparent to-transparent opacity-90 z-10" />
                <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-aldurr-void via-aldurr-void/60 to-transparent z-10 opacity-100 lg:hidden" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-aldurr-void to-transparent z-10 opacity-70 hidden lg:block" />

                <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center">
                    <div className="max-w-4xl relative h-[60vh] md:h-[400px]">
                        {steps.map((step) => (
                            <StepItem
                                key={step.id}
                                step={step}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4 z-30 hidden md:block">
                    {steps.map((step, i) => (
                        <ProgressDot
                            key={i}
                            active={scrollYProgress}
                            range={[step.start, step.end]}
                        />
                    ))}
                </div>

                {/* Continue Scroll Indicator */}
                <ContinueIndicator progress={scrollYProgress} />
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
    peak: number;
    end: number;
}

function StepItem({ step, progress }: { step: Step, progress: MotionValue<number> }) {
    const { start, peak, end } = step;
    const isLast = step.id === "PHASE_04";

    // If it's the last step, don't face out at the end
    const opacityRanges = isLast ? [start, start + 0.05, peak] : [start, start + 0.05, peak, end - 0.05, end];
    const opacityValues = isLast ? [0, 1, 1] : [0, 1, 1, 1, 0];

    const opacity = useTransform(progress, opacityRanges, opacityValues);
    const x = useTransform(progress, [start, start + 0.08, peak], [-40, 0, 0]);
    const filter = useTransform(progress, [start, start + 0.08], ["blur(10px)", "blur(0px)"]);

    return (
        <motion.div
            style={{ opacity, x, filter }}
            className="absolute bottom-0 md:top-0 left-0 w-full max-w-xl pointer-events-none pb-20 md:pb-0"
        >
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-aldurr-honey font-mono text-sm tracking-[0.3em] font-bold">
                        {step.id}
                    </span>
                    <div className="w-12 h-[1px] bg-aldurr-honey/30"></div>
                </div>

                <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter leading-none font-outfit">
                    {step.title}
                </h2>

                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-lg">
                    {step.desc}
                </p>

                <div className="flex items-center gap-6 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Timeline</span>
                        <span className="text-aldurr-honey font-bold tracking-wider">{step.time}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Estado</span>
                        <span className="text-white font-light tracking-wide italic">Em Execução...</span>
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
    const { t } = useLanguage();
    const opacity = useTransform(progress, [0.85, 0.92], [0, 1]);
    const y = useTransform(progress, [0.85, 0.92], [20, 0]);

    return (
        <motion.div 
            style={{ opacity, y }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
            <span className="text-[10px] uppercase tracking-[0.3em] text-aldurr-honey font-bold">
                {t.common.scroll_continue}
            </span>
            <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-[1px] h-8 bg-aldurr-honey/50"
            />
        </motion.div>
    );
}
