import { useEffect, useState } from 'react';
import { Step } from './Step';
import { StepsWrapper } from './style';

export const Steps = (props: StepsProps) => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [stepsList, setStepList] = useState<any[]>([]);

	useEffect(() => {
		let list = props?.data || [];
		if (props.type === 'vertical') {
			let newList = [...list].reverse();
			setStepList(newList);
		} else setStepList(props?.data || []);
	}, []);

	useEffect(() => {
		props?.onChange?.(currentIndex);
	}, [currentIndex]);

	useEffect(() => {
		setCurrentIndex(props.currentIndex || 1);
	}, [props.currentIndex]);

	return (
		<div style={props.type === 'vertical' ? {} : { padding: '0px 30px' }}>
			<StepsWrapper type={props.type}>
				{stepsList.map((res, index) => (
					<Step
						key={index}
						currentIndex={currentIndex === 0 ? 0 : currentIndex}
						index={index + 1}
						lastIndex={stepsList.length - 1 === index}
						disabled={false}
						title={res.title}
						description={res.description}
						type={props.type}
						totalSteps={stepsList.length}
					/>
				))}
			</StepsWrapper>
		</div>
	);
};

export interface StepsProps {
	onChange?: (currentIndex: number) => void;
	data: Array<{
		title: string;
		description: string;
	}>;
	currentIndex?: number;
	type?: 'vertical' | 'horizontal';
}
