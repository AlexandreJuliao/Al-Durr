/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // Impede o browser de adivinhar o tipo do conteúdo (sniffing).
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    // Contra clickjacking: X-Frame-Options para os browsers antigos e
                    // frame-ancestors para os atuais. O site não é embebido em lado
                    // nenhum, por isso 'self' não parte nada.
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
                ],
            },
        ];
    },
};

export default nextConfig;
