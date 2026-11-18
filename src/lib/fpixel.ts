// src/lib/fpixel.ts
export const FB_PIXEL_ID = "1589728065448469";

// O fbq é posto no window pelo script do Pixel (src/app/layout.tsx).
type Fbq = (...args: unknown[]) => void;
const fbq = (): Fbq | undefined =>
  typeof window !== 'undefined' ? (window as Window & { fbq?: Fbq }).fbq : undefined;

export const pageview = () => {
  fbq()?.('track', 'PageView');
};

export const event = (name: string, options = {}) => {
  fbq()?.('track', name, options);
};
