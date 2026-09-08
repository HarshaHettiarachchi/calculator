import { useEffect, useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

type Operator = "+" | "-" | "*" | "/" | null;

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");

  const clearCalculator = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
  };

  const inputNumber = (number: string) => {
    if (display === "Error") {
      setDisplay(number);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setExpression("");
      return;
    }

    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
      return;
    }

    if (display === "0") {
      setDisplay(number);
    } else if (display.length < 15) {
      setDisplay(display + number);
    }
  };

  const inputDecimal = () => {
    if (display === "Error") {
      clearCalculator();
      setDisplay("0.");
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    currentOperator: Operator
  ): number | null => {
    switch (currentOperator) {
      case "+":
        return firstValue + secondValue;

      case "-":
        return firstValue - secondValue;

      case "*":
        return firstValue * secondValue;

      case "/":
        if (secondValue === 0) {
          return null;
        }

        return firstValue / secondValue;

      default:
        return secondValue;
    }
  };

  const formatResult = (result: number): string => {
    if (!Number.isFinite(result)) {
      return "Error";
    }

    return String(Number(result.toPrecision(12)));
  };

  const chooseOperator = (nextOperator: Operator) => {
    if (display === "Error") {
      return;
    }

    const currentValue = Number(display);

    if (
      previousValue !== null &&
      operator !== null &&
      !waitingForOperand
    ) {
      const result = calculate(
        previousValue,
        currentValue,
        operator
      );

      if (result === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setExpression("");
        return;
      }

      const formattedResult = formatResult(result);

      setDisplay(formattedResult);
      setPreviousValue(result);
      setExpression(`${formattedResult} ${nextOperator ?? ""}`);
    } else {
      setPreviousValue(currentValue);
      setExpression(`${display} ${nextOperator ?? ""}`);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const performCalculation = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const currentValue = Number(display);

    const result = calculate(
      previousValue,
      currentValue,
      operator
    );

    if (result === null) {
      setDisplay("Error");
      setPreviousValue(null);
      setOperator(null);
      setExpression("");
      return;
    }

    setDisplay(formatResult(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setExpression("");
  };

  const handlePercentage = () => {
    if (display === "Error") {
      return;
    }

    const result = Number(display) / 100;

    setDisplay(formatResult(result));
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") {
      return;
    }

    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay(`-${display}`);
    }
  };

  const deleteLastDigit = () => {
    if (display === "Error") {
      clearCalculator();
      return;
    }

    if (waitingForOperand) {
      return;
    }

    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith("-"))
    ) {
      setDisplay("0");
      return;
    }

    setDisplay(display.slice(0, -1));
  };

  const handleButtonClick = (value: string) => {
    if (/^\d$/.test(value)) {
      inputNumber(value);
      return;
    }

    switch (value) {
      case ".":
        inputDecimal();
        break;

      case "AC":
        clearCalculator();
        break;

      case "BACKSPACE":
        deleteLastDigit();
        break;

      case "%":
        handlePercentage();
        break;

      case "+/-":
        toggleSign();
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        chooseOperator(value);
        break;

      case "=":
        performCalculation();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        inputNumber(key);
        return;
      }

      if (key === ".") {
        event.preventDefault();
        inputDecimal();
        return;
      }

      if (["+", "-", "*", "/"].includes(key)) {
        event.preventDefault();
        chooseOperator(key as Operator);
        return;
      }

      if (key === "%") {
        event.preventDefault();
        handlePercentage();
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        performCalculation();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        deleteLastDigit();
        return;
      }

      if (key === "Escape") {
        event.preventDefault();
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-6 text-white sm:px-6 sm:py-10">
      <section className="w-full max-w-[420px]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
          <Display
            value={display}
            expression={expression}
          />

          <ButtonGrid
            onButtonClick={handleButtonClick}
          />

          <p className="mt-5 text-center text-[11px] text-neutral-600 sm:text-xs">
            Keyboard supported · Press Esc to clear
          </p>
        </div>
      </section>
    </main>
  );
};

export default Calculator;