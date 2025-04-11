import { Card } from "@/components/wind/Card/index";
import { Icon } from "@/components/wind/Icons/index";
import { Typography } from "@/components/wind/Typography/index";
import {
  EmptyState,
  EmptyTableContainer,
  MarginVertical20,
} from "../styles/style";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

export const EmptyTable = ({ title }: EmptyTableProps) => {
  return (
    // <Card
    //   style={{
    //     width: "100%",
    //     padding: 20,
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    <div className="h-[70vh] flex justify-center items-center w-full">
      <DeviceFlowLoader />
      {/* <EmptyTableContainer> */}
      {/* <EmptyState>
					<Icon type="OutlinedAddressBook" color="black" />
				</EmptyState> */}

      {/* <MarginVertical20 /> */}
      {/* <Typography variant="h6" color="#101112" type="semi-bold">
          {title}
        </Typography> */}
      {/* <MarginVertical20 /> */}
      {/* </EmptyTableContainer> */}
      {/* // </Card> */}
    </div>
  );
};

interface EmptyTableProps {
  title?: string;
}
