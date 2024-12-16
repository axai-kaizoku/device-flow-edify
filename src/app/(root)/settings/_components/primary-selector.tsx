export const PrimarySelector = ({
  isPrimary,
  onSelect,
}: {
  isPrimary: boolean;
  onSelect: (value: boolean) => void;
}) => (
  <div className="flex justify-between items-center gap-3">
    <div
      className={`w-full rounded-lg p-2 border ${
        isPrimary ? "bg-primary text-white" : ""
      }`}
      onClick={() => onSelect(true)}
    >
      Primary
    </div>
    <div
      className={`w-full rounded-lg p-2 border ${
        !isPrimary ? "bg-primary text-white" : ""
      }`}
      onClick={() => onSelect(false)}
    >
      Secondary
    </div>
  </div>
);
