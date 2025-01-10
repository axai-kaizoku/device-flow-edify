import { Colors } from "@/styles/colors";
import React from "react";
import { Icon } from "../Icons";
import { EmptyStar } from "./EmptyStar";
import { RatingContainer } from "./style";

export const StarRating = ({
  onClick,
  initialValue,
  allowFraction,
  style,
  size,
}: Props) => {
  return (
    <RatingContainer
      className="star-rating"
      onClick={onClick}
      initialValue={initialValue}
      allowFraction={allowFraction}
      size={size || 24}
      style={style}
      emptyIcon={<EmptyStar />}
      fillIcon={
        <Icon
          type="FilledStar"
          size="lg"
          color={Colors.yell_500}
        />
      }
    />
  );
};

interface Props {
  onClick: (value: number) => void;
  initialValue: number;
  allowFraction?: boolean;
  size?: number;
  style?: any;
}
