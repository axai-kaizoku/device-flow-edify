import { StoreDevice } from "@/server/deviceActions";

export const DeviceDetailedSecx = ({ data }: { data: StoreDevice }) => {
  const deviceDetails = `Just as a book is judged by its cover, the first thing you notice when
        you pick up a modern smartphone is the display. Nothing surprising,
        because advanced technologies allow you to practically level the display
        frames and cutouts for the front camera and speaker, leaving no room for
        bold design solutions. And how good that in such realities Apple
        everything is fine with displays. Both critics and mass consumers always
        praise the quality of the picture provided by the products of the
        Californian brand. And last year's 6.7-inch Retina panels, which had
        ProMotion, caused real admiration for many.`;

  return (
    <section className="flex px-32 flex-col py-3">
      <h2 className="text-2xl 2xl:text-3xl font-gilroySemiBold py-3">
        Details
      </h2>
      <p className="text-pretty py-3.5 font-gilroySemiBold text-[#9D9D9D] text-sm 2xl:text-base">
        {deviceDetails}
      </p>
      {data.deviceFeatures!.map((feat) => (
        <div key={feat.title}>
          <h3 className="text-xl 2xl:text-2xl font-gilroySemiBold pt-4 pb-3">
            {feat.title}
          </h3>
          {feat.features.map((v) => (
            <div key={v.title} className="pt-1 pb-3">
              <div className="flex items-center justify-between">
                <span>{v.title}</span>
                <span>{v.value}</span>
              </div>
              <div className="h-px my-2.5 w-full bg-[#CDCDCD]" />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
