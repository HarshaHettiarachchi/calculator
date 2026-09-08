interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operator" | "action" | "equals";
}

const CalculatorButton = ({
  label,
  onClick,
  variant = "number",
}: CalculatorButtonProps) => {
  const baseStyles =
    "flex min-h-16 w-full items-center justify-center rounded-2xl text-xl font-semibold select-none transition-all duration-150 active:scale-90 sm:min-h-[72px] sm:text-2xl";

  const variantStyles = {
    number:
      "border border-white/10 bg-white/10 text-white hover:border-white/20 hover:bg-white/20",
    operator:
      "bg-amber-400 text-black shadow-lg shadow-amber-400/10 hover:bg-amber-300",
    action:
      "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/15 hover:text-white",
    equals:
      "bg-amber-500 text-black shadow-xl shadow-amber-500/20 hover:bg-amber-400",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;