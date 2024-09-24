'use client';

import { useEffect, useState } from 'react';
import OrgChart from './_components/chart';

const Org = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
	}, []);

	if (!show) {
		return null;
	}

	return (
		<>
			<OrgChart />
		</>
	);
};

export default Org;
