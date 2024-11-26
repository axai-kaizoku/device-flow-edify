/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	compiler: {
    styledComponents: true,
  },
	images:{
		domains:["www.apple.com"]
	}
};

export default nextConfig;
