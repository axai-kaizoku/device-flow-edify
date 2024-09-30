type Display = {
  infoLabel: string,
  infoText: string,
  isEditing?: boolean,
  onInputChange?: (value: string) => void
};



const InfoDisplay = ({ infoLabel, infoText, isEditing = false, onInputChange }: Display) => {
  return (
    <div className="flex flex-col gap-1 w-2/5">
      <h1>{infoLabel}</h1>
      {isEditing ? (
        <input
          className="p-2 border rounded-md border-gray-200 text-slate-500"
          value={infoText}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
        />
      ) : (
        <p className="p-2 border rounded-md border-gray-300 text-slate-500">{infoText}</p>
      )}
    </div>
  );
};

export default InfoDisplay;
