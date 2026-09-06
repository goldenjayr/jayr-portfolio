import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www serves the same app otherwise, which is duplicate content. Send it
      // to the apex; the canonical tag already points there.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dongje.app" }],
        destination: "https://dongje.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
