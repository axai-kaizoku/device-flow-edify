import { Textarea } from "@/components/wind/Input";

type Display = {
    infoLabel: string,
    infoText: string,
    isEditing?: boolean,
    infoName: string,
    onInputChange?: (value: string) => void
  };
  
  
  
  const AboutDisplay = ({ infoLabel, infoName, infoText, isEditing = false, onInputChange }: Display) => {
    return (
      <div className="flex flex-col gap-1 w-2/5">
        <h1>{infoLabel}</h1>
        {isEditing ? (
          <Textarea
            onChange={(e) => onInputChange && onInputChange(e.target.value)}
            disabled={!isEditing}
            placeholder="Tell Something about yourself..."
            name={infoName}
            style={{
                width: 380
            }}
            value={infoText}
            /> 
        ) : (
          <p className="p-2 border rounded-md border-gray-300 text-slate-500">{infoText}</p>
        )}
      </div>
    );
  };
  
  export default AboutDisplay;
  