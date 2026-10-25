import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    // YouTube poster frames for the performing-arts video facades (FR-10)
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
