import { FilledDot } from '../Icons/components/icons/FilledIcons/FilledDot';
import { CheckIcon } from './CheckIcon';
import {
	Item,
	ItemTail,
	ItemIcon,
	ItemContent,
	ContentTitle,
	ContentDescription,
	StepNumber,
	Container,
} from './style';
import { Colors } from './styles/colors';

// Step Component
export const Step = (props: StepProps) => {
	return (
		<Item>
			<Container type={props.type}>
				<ItemTail
					index={props.index}
					vertical={props.type === 'vertical'}
					notFinished={
						props.type === 'vertical'
							? props.index >= 0 && props.index < props.totalSteps
							: props.currentIndex <= props.index
					}
					type={props.type}
					lastIndex={props.lastIndex}
					isFinished={
						props.type === 'vertical'
							? props.currentIndex > props.index
							: props.currentIndex > props.index
					}
				/>
				{props.type === 'vertical' ? (
					<ItemIcon>
						{props.currentIndex > props.index ? (
							<CheckIcon />
						) : (
							<StepNumber
								disabled={props.index < props.currentIndex}
								notFinished={props.currentIndex < props.index}>
								<FilledDot
									size="xs"
									color={
										props.index < props.currentIndex
											? Colors.grey_100
											: Colors.info_500
									}
								/>
							</StepNumber>
						)}
					</ItemIcon>
				) : (
					<ItemIcon>
						{props.currentIndex > props.index ? (
							<CheckIcon />
						) : (
							<StepNumber notFinished={props.currentIndex < props.index}>
								{props.index + 1}
							</StepNumber>
						)}
					</ItemIcon>
				)}

				<ItemContent type={props.type}>
					<ContentTitle currentState={props.currentIndex === props.index}>
						{props.title}
					</ContentTitle>
					<ContentDescription
						vertical={props.type === 'vertical'}
						currentState={props.currentIndex === props.index}>
						{props.description}
					</ContentDescription>
				</ItemContent>
			</Container>
		</Item>
	);
};

// StepProps Interface
export interface StepProps {
	currentIndex: number;
	index: number;
	disabled: boolean;
	title: string;
	description: string;
	lastIndex: boolean;
	type: 'vertical' | 'horizontal' | undefined;
	totalSteps: number;
}
