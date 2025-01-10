import React, { useState } from 'react';
import { InfoButton } from '../../Buttons';
import { Icon } from '../../Icons/components/IconComponent';
import { IconsType } from '../../Icons/components/icons/interface';
import { Typography } from '../../Typography';
import { Colors } from '../styles/colors';
import {
	ActionButtonContainer,
	CardFooter,
	CardHeader,
	HeaderIconContainer,
	HeaderLeft,
	MenuContainer,
	StyledCard,
	TitleContainer,
	TitleIcon,
	TitleText,
} from '../styles/style';

export const Card = ({
	headerTitle,
	subHeaderTitle,
	style,
	children,
	className,
	headerActionButtons,
	footerActionButtons,
	dropDownItems,
	headerIcon,
	hover,
	onClick,
}: CardProps) => {
	// Render Header
	const [showDropdown, setShowDropdown] = useState<boolean>();

	function renderCardHeader() {
		return (
			<CardHeader>
				<HeaderLeft>
					{/* Icon and Title */}
					<TitleContainer>
						{headerIcon && (
							<TitleIcon>
								{
									<HeaderIconContainer>
										<Icon
											size="lg"
											type={headerIcon}
										/>
									</HeaderIconContainer>
								}
							</TitleIcon>
						)}
						<TitleText>
							{headerTitle && (
								<Typography
									type="medium"
									variant="h6"
									color={Colors?.grey_900}
									style={{
										marginRight: 'auto',
									}}>
									{headerTitle}
								</Typography>
							)}
							{subHeaderTitle && (
								<Typography
									type="regular"
									variant="body-text2"
									color={Colors?.grey_500}
									style={{
										marginRight: 'auto',
									}}>
									{subHeaderTitle}
								</Typography>
							)}
						</TitleText>
					</TitleContainer>

					<ActionButtonContainer>
						{headerActionButtons &&
							headerActionButtons.map((btn: any) => (
								<InfoButton
									key={btn.name}
									size="md"
									variant={btn.type}
									onClick={btn.onClick}>
									{btn?.name}
								</InfoButton>
							))}
					</ActionButtonContainer>
				</HeaderLeft>

				{/* {dropDownItems && (
          <MenuContainer>
            <Dropdown
              trigger="click"
              visible={showDropdown}
              setDropdownVisibility={(visible) => {
                setShowDropdown(visible);
              }}
              width="150px"
              wrapper={
                <Icon
                  size="md"
                  type="OutlinedDotsVertical"
                  color={Colors?.grey_500}
                  style={{ cursor: "pointer" }}
                />
              }
            >
              <Menu>
                {dropDownItems &&
                  dropDownItems?.map((item, index) => (
                    <MenuItem key={index} onClick={item?.onClick}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </Menu>
            </Dropdown>
          </MenuContainer>
        )} */}
			</CardHeader>
		);
	}
	// Render Footer
	function renderCardFooter() {
		return (
			<CardFooter>
				{footerActionButtons &&
					footerActionButtons.map((btn) => (
						<InfoButton
							key={btn.name}
							size="md"
							variant="primary"
							onClick={btn?.onClick}>
							{btn?.name}
						</InfoButton>
					))}
			</CardFooter>
		);
	}
	return (
		<StyledCard
			style={style}
			className={className}
			hover={hover}
			onClick={onClick}>
			{/* Render Header when headerTitle or subHeaderTitle or headerActionButtons or dropDownItems is present */}
			{(headerTitle ||
				subHeaderTitle ||
				headerActionButtons?.length ||
				[].length > 0 ||
				dropDownItems?.length ||
				[].length > 0 ||
				headerIcon) &&
				renderCardHeader()}
			{children}
			{/* Render Footer when LearnMore or footerActionButtons is present */}
			{footerActionButtons && renderCardFooter()}
		</StyledCard>
	);
};

export interface CardProps {
	style?: React.CSSProperties;
	children?: React.ReactNode;
	className?: string;
	//Header Icon Type
	headerIcon?: IconsType;
	headerTitle?: string;
	subHeaderTitle?: string;
	//Accept Array of ButtonType Object (maximum of 4)
	headerActionButtons?: ActionButtons;
	//Accept single ButtonType Object
	footerActionButtons?: Array<ButtonType>;
	//Accept Array of ButtonType Object (maximum of 4)
	dropDownItems?: Array<DropdownType>;
	hover?: boolean;
	onClick?: () => void;
}

export interface ButtonType {
	//name of the button
	name: string;
	//action to perform when clicked on current button
	onClick: () => void;
	//button variant
	type?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-wrap';
}

//Accept max 4 button object of ButtonType
export type ActionButtons = [
	ButtonType?,
	ButtonType?,
	ButtonType?,
	ButtonType?,
];

export interface DropdownType {
	//Menu Item title
	name: string;
	//action to perform when clicked on current menu item
	onClick: () => void;
}
