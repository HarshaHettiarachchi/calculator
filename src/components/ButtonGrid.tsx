import CalculatorButton from "./CalculatorButton";

interface ButtonGridProps {
  onButtonClick: (value: string) => void;
}

interface CalculatorButtonItem {
  label: string;
  value: string;
  variant: "number" | "operator" | "action" | "equals";
}

const ButtonGrid = ({ onButtonClick }: ButtonGridProps) => {
  const buttons: CalculatorButtonItem[] = [
    {
      label: "AC",
      value: "AC",
      variant: "action",
    },
    {
      label: "⌫",
      value: "BACKSPACE",
      variant: "action",
    },
    {
      label: "%",
      value: "%",
      variant: "action",
    },
    {
      label: "÷",
      value: "/",
      variant: "operator",
    },

    {
      label: "7",
      value: "7",
      variant: "number",
    },
    {
      label: "8",
      value: "8",
      variant: "number",
    },
    {
      label: "9",
      value: "9",
      variant: "number",
    },
    {
      label: "×",
      value: "*",
      variant: "operator",
    },

    {
      label: "4",
      value: "4",
      variant: "number",
    },
    {
      label: "5",
      value: "5",
      variant: "number",
    },
    {
      label: "6",
      value: "6",
      variant: "number",
    },
    {
      label: "−",
      value: "-",
      variant: "operator",
    },

    {
      label: "1",
      value: "1",
      variant: "number",
    },
    {
      label: "2",
      value: "2",
      variant: "number",
    },
    {
      label: "3",
      value: "3",
      variant: "number",
    },
    {
      label: "+",
      value: "+",
      variant: "operator",
    },

    {
      label: "+/−",
      value: "+/-",
      variant: "action",
    },
    {
      label: "0",
      value: "0",
      variant: "number",
    },
    {
      label: ".",
      value: ".",
      variant: "number",
    },
    {
      label: "=",
      value: "=",
      variant: "equals",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {buttons.map((button) => (
        <CalculatorButton
          key={button.value}
          label={button.label}
          variant={button.variant}
          onClick={() => onButtonClick(button.value)}
        />
      ))}
    </div>
  );
};

export default ButtonGrid;