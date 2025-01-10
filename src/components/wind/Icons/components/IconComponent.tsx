import * as React from "react";
import { FilledDot } from "./icons/FilledIcons/FilledDot";
import { FilledDownCaret } from "./icons/FilledIcons/FilledDownCaret";
import { FilledError } from "./icons/FilledIcons/FilledError";
import { FilledStar } from "./icons/FilledIcons/FilledStar";
import { FilledSuccess } from "./icons/FilledIcons/FilledSuccess";
import { FilledWarning } from "./icons/FilledIcons/FilledWarning";
import { IconProps, IconsType } from "./icons/interface";
import { OutlinedAddressBook } from "./icons/OutlineIcons/OutlineAddressBook";
import { OutlinedAdmissions } from "./icons/OutlineIcons/OutlinedAdmissions";
import { OutlinedArrowDown } from "./icons/OutlineIcons/OutlinedArrowDown";
import { OutlinedArrowLeft } from "./icons/OutlineIcons/OutlinedArrowLeft";
import { OutlinedArrowRight } from "./icons/OutlineIcons/OutlinedArrowRight";
import { OutlinedArrowUp } from "./icons/OutlineIcons/OutlinedArrowUp";
import { OutlinedBin } from "./icons/OutlineIcons/OutlinedBin";
import { OutlinedBinoculars } from "./icons/OutlineIcons/OutlinedBinoculars";
import { OutlinedBrackets } from "./icons/OutlineIcons/OutlinedBrackets";
import { OutlinedCalender } from "./icons/OutlineIcons/OutlinedCalendar";
import { OutlinedCheck } from "./icons/OutlineIcons/OutlinedCheck";
import { OutlinedClock } from "./icons/OutlineIcons/OutlinedClock";
import { OutlinedClose } from "./icons/OutlineIcons/OutlinedClose";
import { OutlinedCopy } from "./icons/OutlineIcons/OutlinedCopy";
import { OutlinedDotsVertical } from "./icons/OutlineIcons/OutlinedDotsVertical";
import { OutlinedDownChevron } from "./icons/OutlineIcons/OutlinedDownChevron";
import { OutlinedDownload } from "./icons/OutlineIcons/OutlinedDownload";
import { OutlinedEar } from "./icons/OutlineIcons/OutlinedEar";
import { OutlinedEdit } from "./icons/OutlineIcons/OutlinedEdit";
import { OutlinedError } from "./icons/OutlineIcons/OutlinedError";
import { OutlinedEye } from "./icons/OutlineIcons/OutlinedEye";
import { OutlinedFile } from "./icons/OutlineIcons/OutlinedFile";
import { OutlinedHamburger } from "./icons/OutlineIcons/OutlinedHamburger";
import { OutlinedHome } from "./icons/OutlineIcons/OutlinedHome";
import { OutlinedId } from "./icons/OutlineIcons/OutlinedId";
import { OutlinedImage } from "./icons/OutlineIcons/OutlinedImage";
import { OutlinedInfo } from "./icons/OutlineIcons/OutlinedInfo";
import { OutlinedLaptop } from "./icons/OutlineIcons/OutlinedLaptop";
import { OutlinedLeads } from "./icons/OutlineIcons/OutlinedLeads";
import { OutlinedLeftChevron } from "./icons/OutlineIcons/OutlinedLeftChevron";
import { OutlinedLive } from "./icons/OutlineIcons/OutlinedLive";
import { OutlinedLightening } from "./icons/OutlineIcons/OutlinedLightining";
import { OutlinedLoader } from "./icons/OutlineIcons/OutlinedLoader";
import { OutlinedMail } from "./icons/OutlineIcons/OutlinedMail";
import { OutlinedManage } from "./icons/OutlineIcons/OutlinedManage";
import { OutlinedMessage } from "./icons/OutlineIcons/OutlinedMessage";
import { OutlinedMobile } from "./icons/OutlineIcons/OutlinedMobile";
import { OutlinedMoney } from "./icons/OutlineIcons/OutlinedMoney";
import { OutlinedNotify } from "./icons/OutlineIcons/OutlinedNotify";
import { OutlinedNumber } from "./icons/OutlineIcons/OutlinedNumber";
import { OutlinedPassword } from "./icons/OutlineIcons/OutlinedPassword";
import { OutlinedPhone } from "./icons/OutlineIcons/OutlinedPhone";
import { OutlinedPlay } from "./icons/OutlineIcons/OutlinedPlay";
import { OutlinedPlus } from "./icons/OutlineIcons/OutlinedPlus";
import { OutlinedQRCode } from "./icons/OutlineIcons/OutlinedQRCode";
import { OutlinedQuestion } from "./icons/OutlineIcons/OutlinedQuestion";
import { OutlinedRequests } from "./icons/OutlineIcons/OutlinedRequests";
import { OutlinedReset } from "./icons/OutlineIcons/OutlinedReset";
import { OutlinedRightChevron } from "./icons/OutlineIcons/OutlinedRightChevron";
import { OutlinedSearch } from "./icons/OutlineIcons/OutlinedSearch";
import { OutlinedSettings } from "./icons/OutlineIcons/OutlinedSettings";
import { OutlinedSchedule } from "./icons/OutlineIcons/OutlinedSchedule";
import { OutlinedStar } from "./icons/OutlineIcons/OutlinedStar";
import { OutlinedStore } from "./icons/OutlineIcons/OutlinedStore";
import { OutlinedSuccess } from "./icons/OutlineIcons/OutlinedSuccess";
import { OutlinedSwitch } from "./icons/OutlineIcons/OutlinedSwitch";
import { OutlinedTopChevron } from "./icons/OutlineIcons/OutlinedTopChevron";
import { OutlinedUpload } from "./icons/OutlineIcons/OutlinedUpload";
import { OutlinedVideo } from "./icons/OutlineIcons/OutlinedVideo";
import { OutlinedWarning } from "./icons/OutlineIcons/OutlinedWarning";
import { OutlinedLink } from "./icons/OutlineIcons/OutlineLink";
import { SideBarApps } from "./icons/SideBarIcons/SideBarApps";
import { SideBarAttendance } from "./icons/SideBarIcons/SideBarAttendance";
import { SideBarBatches } from "./icons/SideBarIcons/SideBarBatches";
import { SideBarContent } from "./icons/SideBarIcons/SideBarContent";
import { SideBarCourses } from "./icons/SideBarIcons/SideBarCourses";
import { SideBarDoubts } from "./icons/SideBarIcons/SideBarDoubts";
import { SideBarFee } from "./icons/SideBarIcons/SideBarFee";
import { SideBarHome } from "./icons/SideBarIcons/SideBarHome";
import { SideBarHomeWork } from "./icons/SideBarIcons/SideBarHomework";
import { SideBarLiveClass } from "./icons/SideBarIcons/SideBarLiveClass";
import { SideBarParents } from "./icons/SideBarIcons/SideBarParents";
import { SideBarQuiz } from "./icons/SideBarIcons/SideBarQuiz";
import { OutlinedChange } from "./icons/OutlineIcons/OutlinedChange";
import { OutlinedLockOpen } from "./icons/OutlineIcons/OutlinedLockOpen";
import { OutlinedGift } from "./icons/OutlineIcons/OutlinedGift";
import { FilledThumbsUp } from "./icons/FilledIcons/FilledThumbsUp";
import { OutlinedCheckCircle } from "./icons/OutlineIcons/OutlinedCheckCircle";
import { OutlinedNote } from "./icons/OutlineIcons/OutlinedNote";
import { OutlinedPackage } from "./icons/OutlineIcons/OutlinedPackage";
import { OutlinedClockCheck } from "./icons/OutlineIcons/OutlinedClockCheck";

export const Icon = ({ type, ...rest }: IconProps) => {
  const returnIcon = () => {
    switch (type) {
      case "FilledDot":
        return <FilledDot {...rest} />;
      case "FilledDownCaret":
        return <FilledDownCaret {...rest} />;
      case "FilledError":
        return <FilledError {...rest} />;
      case "FilledStar":
        return <FilledStar {...rest} />;
      case "FilledSuccess":
        return <FilledSuccess {...rest} />;
      case "FilledWarning":
        return <FilledWarning {...rest} />;
      case "OutlinedAddressBook":
        return <OutlinedAddressBook {...rest} />;
      case "OutlinedArrowDown":
        return <OutlinedArrowDown {...rest} />;
      case "OutlinedArrowLeft":
        return <OutlinedArrowLeft {...rest} />;
      case "OutlinedArrowRight":
        return <OutlinedArrowRight {...rest} />;
      case "OutlinedArrowUp":
        return <OutlinedArrowUp {...rest} />;
      case "OutlinedBin":
        return <OutlinedBin {...rest} />;
      case "OutlinedCalender":
        return <OutlinedCalender {...rest} />;
      case "OutlinedCheck":
        return <OutlinedCheck {...rest} />;
      case "OutlinedClock":
        return <OutlinedClock {...rest} />;
      case "OutlinedClose":
        return <OutlinedClose {...rest} />;
      case "OutlinedCopy":
        return <OutlinedCopy {...rest} />;
      case "OutlinedDotsVertical":
        return <OutlinedDotsVertical {...rest} />;
      case "OutlinedDownChevron":
        return <OutlinedDownChevron {...rest} />;
      case "OutlinedDownload":
        return <OutlinedDownload {...rest} />;
      case "OutlinedEar":
        return <OutlinedEar {...rest} />;
      case "OutlinedEdit":
        return <OutlinedEdit {...rest} />;
      case "OutlinedError":
        return <OutlinedError {...rest} />;
      case "OutlinedEye":
        return <OutlinedEye {...rest} />;
      case "OutlinedFile":
        return <OutlinedFile {...rest} />;
      case "OutlinedHome":
        return <OutlinedHome {...rest} />;
      case "OutlinedImage":
        return <OutlinedImage {...rest} />;
      case "OutlinedInfo":
        return <OutlinedInfo {...rest} />;
      case "OutlinedLaptop":
        return <OutlinedLaptop {...rest} />;
      case "OutlinedLeftChevron":
        return <OutlinedLeftChevron {...rest} />;
      case "OutlinedLightening":
        return <OutlinedLightening {...rest} />;
      case "OutlinedLoader":
        return <OutlinedLoader {...rest} />;
      case "OutlinedMobile":
        return <OutlinedMobile {...rest} />;
      case "OutlinedNotify":
        return <OutlinedNotify {...rest} />;
      case "OutlinedPlay":
        return <OutlinedPlay {...rest} />;
      case "OutlinedPlus":
        return <OutlinedPlus {...rest} />;
      case "OutlinedQuestion":
        return <OutlinedQuestion {...rest} />;
      case "OutlinedRightChevron":
        return <OutlinedRightChevron {...rest} />;
      case "OutlinedSearch":
        return <OutlinedSearch {...rest} />;
      case "OutlinedSettings":
        return <OutlinedSettings {...rest} />;
      case "OutlinedSchedule":
        return <OutlinedSchedule {...rest} />;
      case "OutlinedStar":
        return <OutlinedStar {...rest} />;
      case "OutlinedSuccess":
        return <OutlinedSuccess {...rest} />;
      case "OutlinedSwitch":
        return <OutlinedSwitch {...rest} />;
      case "OutlinedTopChevron":
        return <OutlinedTopChevron {...rest} />;
      case "OutlinedUpload":
        return <OutlinedUpload {...rest} />;
      case "OutlinedVideo":
        return <OutlinedVideo {...rest} />;
      case "OutlinedWarning":
        return <OutlinedWarning {...rest} />;
      case "OutlinedBrackets":
        return <OutlinedBrackets {...rest} />;
      case "OutlinedLink":
        return <OutlinedLink {...rest} />;
      case "OutlinedQRCode":
        return <OutlinedQRCode {...rest} />;
      case "OutlinedBinoculars":
        return <OutlinedBinoculars {...rest} />;
      case "OutlinedMoney":
        return <OutlinedMoney {...rest} />;
      case "OutlinedAdmissions":
        return <OutlinedAdmissions {...rest} />;
      case "OutlinedHamburger":
        return <OutlinedHamburger {...rest} />;
      case "OutlinedLeads":
        return <OutlinedLeads {...rest} />;
      case "OutlinedLive":
        return <OutlinedLive {...rest} />;
      case "OutlinedManage":
        return <OutlinedManage {...rest} />;
      case "OutlinedNumber":
        return <OutlinedNumber {...rest} />;
      case "OutlinedPhone":
        return <OutlinedPhone {...rest} />;
      case "OutlinedReset":
        return <OutlinedReset {...rest} />;
      case "OutlinedRequests":
        return <OutlinedRequests {...rest} />;
      case "OutlinedStore":
        return <OutlinedStore {...rest} />;
      case "OutlinedMail":
        return <OutlinedMail {...rest} />;
      case "OutlinedId":
        return <OutlinedId {...rest} />;
      case "SideBarApps":
        return <SideBarApps {...rest} />;
      case "SideBarAttendance":
        return <SideBarAttendance {...rest} />;
      case "SideBarBatches":
        return <SideBarBatches {...rest} />;
      case "SideBarContent":
        return <SideBarContent {...rest} />;
      case "SideBarCourses":
        return <SideBarCourses {...rest} />;
      case "SideBarDoubts":
        return <SideBarDoubts {...rest} />;
      case "SideBarFee":
        return <SideBarFee {...rest} />;
      case "SideBarHome":
        return <SideBarHome {...rest} />;
      case "SideBarHomeWork":
        return <SideBarHomeWork {...rest} />;
      case "SideBarLiveClass":
        return <SideBarLiveClass {...rest} />;
      case "SideBarParents":
        return <SideBarParents {...rest} />;
      case "SideBarQuiz":
        return <SideBarQuiz {...rest} />;
      case "OutlinedReset":
        return <OutlinedReset {...rest} />;
      case "OutlinedPassword":
        return <OutlinedPassword {...rest} />;
      case "OutlinedMessage":
        return <OutlinedMessage {...rest} />;
      case "OutlinedLockOpen":
        return <OutlinedLockOpen {...rest} />;
      case "OutlinedChange":
        return <OutlinedChange {...rest} />;
      case "OutlinedGift":
        return <OutlinedGift {...rest} />;
      case "FilledThumbsUp":
        return <FilledThumbsUp {...rest} />;
      case "OutlinedCheckCircle":
        return <OutlinedCheckCircle {...rest} />;
      case "OutlinedNote":
        return <OutlinedNote {...rest} />;
      case "OutlinedPackage":
        return <OutlinedPackage {...rest} />;
      case "OutlinedClockCheck":
        return <OutlinedClockCheck {...rest} />;
    }
  };

  return returnIcon() || <div />;
};
