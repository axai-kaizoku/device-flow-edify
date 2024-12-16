import { Input } from "@/components/inputs/Input";
import { cn } from "@/lib/utils";

export const FormField = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Correct type
  error?: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-medium text-foreground"
    >
      {label}
    </label>
    <Input
      id={id}
      className={cn(
        error
          ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
          : "h-12"
      )}
      value={value}
      onChange={onChange} // Fix: Re-enabled onChange
      placeholder={placeholder}
      {...props}
    />
    {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
  </div>
);
