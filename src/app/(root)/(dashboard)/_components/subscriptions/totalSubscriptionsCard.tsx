"use client";
import { UserData } from "@/app/store/authSlice";
import { Button } from "@/components/buttons/Button";
import { useSelector } from "react-redux";
import { Pie, Cell, PieChart } from "recharts";

export default function TotalSubscriptionsCard() {
  const user: UserData = useSelector((state: any) => state.auth.userData);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group F", value: 100 },
  ];
  const COLORS = ["#7086FD", "#6FD195", "#FFAE4C", "#1F94FF", "#FF928A"];

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[562px] h-[282px] bg-white rounded-[10px] border border-black/10  flex flex-col justify-start px-[10px] pl-[30px] py-[20px]">
        <div className="flex gap-2">
          <span className="text-black font-gilroy text-[14px] font-semibold leading-[22.686px]">
            Subscriptions
          </span>
          <div
            style={{
              borderRadius: 16,
              padding: 2,
              background: "var(--Primary-50, #F9F5FF)",
              width: 109,
              height: 23,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="text-[#6941C6] text-center font-gilroy text-[12.435px] font-medium leading-[18.652px]">
              23 Subscriptions
            </span>
          </div>
        </div>

        <div className="flex flex gap-4 items-center">
          <div style={{ width: "100%" }}>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={80}
                cy={100}
                innerRadius={65}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth="2.19207"
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex gap-4 w-full items-center">
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#7086FD",
                  borderRadius: 100,
                }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Figma
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#6FD195",
                  borderRadius: 100,
                }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Slack
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#FFAE4C",
                  borderRadius: 100,
                }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Gsuite
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#1F94FF",
                  borderRadius: 100,
                }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Zoom
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#FF928A",
                  borderRadius: 100,
                }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Others
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $63/Month
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $63/Month
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $63/Month
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $63/Month
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $63/Month
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                123 Seats
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                123 Seats
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                123 Seats
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                123 Seats
              </span>
            </div>
            <div className="flex gap-4 w-full items-center">
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                123 Seats
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[70px] rounded-[10px] border border-black/10 flex  px-[10px] pl-[10px] py-[10px]">
        <div className="relative flex overflow-x-hidden w-full">
          <div className="py-3 animate-marquee whitespace-nowrap w-full flex">
            <div className="flex items-center gap-2 w-full">
              <img
                src="media/integrations-companies/slack-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Slack
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/drop-box-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                DropBox
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/figma-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Figma
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gmail-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Gmail
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gsuite-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Gsuite
              </span>
            </div>
          </div>

          <div className="absolute top-0 py-3 animate-marquee2 whitespace-nowrap flex">
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/slack-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Slack
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/drop-box-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                DropBox
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/figma-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Figma
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gmail-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Gmail
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gsuite-icon.png"
                style={{ width: 20, height: 20 }}
              />
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                Gsuite
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center" style={{
          borderRadius: 10,
          background: 'linear-gradient(270deg, #FFF 74.27%, rgba(255, 255, 255, 0.00) 103.5%)',
          width: 150
        }}>
          <Button style={{
            borderRadius: 5,
            height: 30,
            width: 76,
            border: '1px solid rgba(0, 0, 0, 0.10)',
            background: '#000',
            color: '#fff'
          }}>View All</Button>
        </div>
      </div>
    </div>
  );
}
