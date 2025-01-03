import CreateDevice from "./_components/create-device";

function DevicesHeader({
  button,

  totalDocuments,
}: {
  button: string;
  totalDocuments: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between w-full pt-5">
        <div>
          <h1 className="text-xl">{totalDocuments}🖥️</h1>
        </div>

        <CreateDevice>{button}</CreateDevice>
      </div>
    </div>
  );
}

export default DevicesHeader;
