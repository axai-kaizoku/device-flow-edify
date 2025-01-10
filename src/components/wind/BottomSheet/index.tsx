import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export const BottomSheetComponent = ({ open, onClose, children }: Props) => {
  return (
    <BottomSheet open={open} onDismiss={onClose}>
      <div style={{padding: 20}}>{children}</div>
    </BottomSheet>
  );
};

interface Props {
  children: any;
  open: any;
  onClose: any;
}
