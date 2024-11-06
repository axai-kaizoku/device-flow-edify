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
		<section className="flex flex-col w-full p-8 overflow-hidden h-full">
			{children}
		</section>
	);
};

export const OuterContainer = ({ children }: ChildrenProps) => {
	return (
		<div className="flex flex-col w-full min-h-screen h-full">{children}</div>
	);
};

export const ContainerHeader = ({
	title,
	description,
}: ContainerHeaderProps) => {
	return (
		<div className="h-[20vh] w-full bg-muted p-8 flex items-end">
			<div className="flex flex-col gap-1">
				<div className="text-4xl font-black tracking-tighter">{title}</div>
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
