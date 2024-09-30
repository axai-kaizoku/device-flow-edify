import { FileText } from "lucide-react"
import InfoDisplay from "./infoDisplay"
import Link from "next/link"

const Document = ({userInfo}:any) => {
  return (
    <div className="flex gap-4 flex-col mt-2">
        <div className="flex gap-4 p-3 border shadow-sm">
            <FileText />
            <Link className="hover:underline" target="_blank" href="https://indiadarpan.com/wp-content/uploads/2018/10/Aadhaar-Card-sample.png"><h1>Adhaar Card</h1></Link>
        </div>

        <div className="flex gap-4 p-3 border shadow-sm">
            <FileText />
            <Link className="hover:underline" target="_blank" href="https://www.thestatesman.com/wp-content/uploads/2019/07/pan-card.jpg"><h1>Pan Card</h1></Link>
        </div>

        <div className="flex gap-4 p-3 border shadow-sm">
            <FileText />
            <h1>Adhaar Card</h1>
        </div>

    </div>
  )
}

export default Document