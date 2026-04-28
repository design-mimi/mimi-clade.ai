import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Force happytalk-enduser pages to always serve fresh HTML so design
    // updates appear without manual ?v= cache busters on the canonical URLs.
    // Asset chunks keep their immutable build-hash cache (handled by Next.js).
    const noStore = [
      { key: "Cache-Control", value: "no-store, must-revalidate" },
    ];
    return [
      { source: "/happytalk-enduser", headers: noStore },
      { source: "/happytalk-enduser/preview", headers: noStore },
    ];
  },
};

export default nextConfig;
