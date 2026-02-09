"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function GaleriaPage() {
    return (
        <main className="bg-aldurr-canvas min-h-screen relative text-white">
            <Navbar />
            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                    Portfólio
                </span>
                <h1 className="text-5xl md:text-7xl font-bold">
                    Galeria Visual
                </h1>
            </section>

            <section className="container mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder Grid */}
                    {/* Living Room - Large Feature */}
                    <div className="md:col-span-2 relative h-[300px] md:h-[600px] bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-living.png"
                            alt="Living Room Luxury"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Living Room</div>
                    </div>

                    {/* Mezzanine Bedroom */}
                    <div className="relative h-[300px] md:h-[600px] bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-bedroom.png"
                            alt="Mezzanine Bedroom"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Master Suite</div>
                    </div>

                    {/* Kitchen */}
                    <div className="relative h-[300px] bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-kitchen.png"
                            alt="Minimalist Kitchen"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Kitchen</div>
                    </div>

                    {/* Spa Bathroom */}
                    <div className="relative h-[300px] bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-bathroom.png"
                            alt="Spa Bathroom"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Spa Bath</div>
                    </div>

                    {/* Office */}
                    <div className="relative h-[300px] bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-office.png"
                            alt="Home Office"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Studio Office</div>
                    </div>

                    {/* Dining Room */}
                    <div className="relative h-[300px] md:col-span-3 bg-white/5 border border-white/5 group overflow-hidden">
                        <Image
                            src="/interior-dining.png"
                            alt="Dining Area"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Dining Area</div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
