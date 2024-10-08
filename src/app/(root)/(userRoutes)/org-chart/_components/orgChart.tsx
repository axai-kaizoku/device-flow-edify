'use client';

import { useEffect, useState } from 'react';
import OrgChart from './chart';
//Resolving SSR issue here
const Org = ({data}:any) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
	}, []);

	if (!show) {
		return null;
	}

	return (
		<>
			<OrgChart orgData={data} />
		</>
	);
};

export default Org;
