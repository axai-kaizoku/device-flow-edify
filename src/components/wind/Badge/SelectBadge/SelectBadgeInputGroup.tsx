import React, { useState, useEffect } from "react";
import { IconsType } from "../../Icons/components/icons/interface";
import { Typography } from "../../Typography";
import { SelectBadge } from "./SelectBadge";
import { SelectBadgeGroup, StyledInputGroup } from "./style";

export const SelectBadgeInputGroup = ({
  size = "md",
  label,
  list,
  defaultValue,
  onChange,
  displayKey,
  iconRight,
  style,
}: SelectBadgeInputGroupProps) => {
  const [selected, setSelected] = useState<Object | any>(defaultValue || null);
  useEffect(() => {
    checkIfListContainsObject();
  }, []);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const checkIfListContainsObject = () => {
    return (
      list?.length > 0 &&
      typeof list[0] === "object" &&
      (displayKey?.length || [].length) > 0
    );
  };

  const getActiveItem = (item: any) => {
    return selected && checkIfListContainsObject()
      ? //@ts-ignore
        item[displayKey] === selected?.[displayKey]
      : item === selected;
  };

  const getLabel = (item: any) => {
    //@ts-ignore
    return checkIfListContainsObject() ? item[displayKey] : item;
  };

  const badgeList = list?.map((item: any) => (
    <SelectBadge
      icon={item?.icon}
      image={item?.image}
      selected={getActiveItem(item)}
      onClick={() => setSelected(item)}
      size={size}
      iconRight={iconRight}
    >
      {getLabel(item)}
    </SelectBadge>
  ));

  return (
    <StyledInputGroup hasLabel={(label?.length || [].length) > 0}>
      {(label?.length || [].length) > 0 && (
        <Typography variant="body-text2" type="semi-bold">
          {label}
        </Typography>
      )}
      <SelectBadgeGroup style={style}>
        {list?.map((item) => (
          <SelectBadge
            selected={getActiveItem(item)}
            onClick={() => setSelected(item)}
            size={size}
          >
            {getLabel(item)}
          </SelectBadge>
        ))}
      </SelectBadgeGroup>
    </StyledInputGroup>
  );
};

type ConditionalProps =
  // list of items to render in select badge. list can be Array of object or Array of string or number
  // key to display the list item's label (if the list passed is an Array of object)

  // if list is passed as Array of object, displayKey is mandatory
  | { list: Array<Object>; displayKey: string }
  // if list is passed as Array of string or  number, displayKey is optional
  | { list: Array<string | number>; displayKey?: string };

export interface CommonProps {
  // label for select badge input group
  label?: string;
  // size of the select badge input group
  size?: "md" | "lg";
  // handler for badge selection change
  onChange: (selected: any) => void;
  // defaultValue value for selected badge
  defaultValue?: any;
  // common icon placed at right side of the select badge in default state
  iconRight?: IconsType;
  style?: React.CSSProperties;
}

export type SelectBadgeInputGroupProps = CommonProps & ConditionalProps;
