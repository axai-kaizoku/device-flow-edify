type ChildrenProps = { children: React.ReactNode };
type ContainerHeaderProps = {
	title: string;
	description?: string;
};
type CombinedContainerProps = {
	title: string;
	description?: string;
	children: React.ReactNode;
};

export const InnerContainer = ({ children }: ChildrenProps) => {
	return (
		<section className="flex flex-col w-full p-8 overflow-hidden">
			{children}
		</section>
	);
};

export const OuterContainer = ({ children }: ChildrenProps) => {
	return <div className="flex flex-col w-full h-full">{children}</div>;
};

export const ContainerHeader = ({
	title,
	description,
}: ContainerHeaderProps) => {
	return (
		<div className="h-[16%] w-full bg-muted p-8 flex items-end">
			<div className="flex flex-col gap-1">
				<div className="text-3xl font-medium">{title}</div>
				<div>{description}</div>
			</div>
		</div>
	);
};

export const CombinedContainer = ({
	title,
	description,
	children,
}: CombinedContainerProps) => {
	return (
		<OuterContainer>
			<ContainerHeader title={title} description={description} />
			<InnerContainer>{children}</InnerContainer>
		</OuterContainer>
	);
};
