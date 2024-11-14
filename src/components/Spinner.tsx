// components/Spinner.tsx

import React from 'react';

const Spinner = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="w-7 h-7 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin"></div>
		</div>
	);
};

export default Spinner;
