import React, { useState } from "react";

// TipCalculator class that does the calculation
class TipCalculator {
  public BillAmount: number;
  public TipPercentage: number;

  constructor(BillAmount: number, TipPercentage: number) {
    this.BillAmount = BillAmount;
    this.TipPercentage = TipPercentage;
  }

  GetTipAmount(): number {
    return this.BillAmount * (this.TipPercentage / 100);
  }

  GetResult(): number {
    return this.BillAmount + this.GetTipAmount();
  }
}

const App = () => {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const calculator = new TipCalculator(billAmount, tipPercentage);

  const handleCalculate = () => {
    setTotal(calculator.GetResult());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="container h-[500px] w-[500px] bg-white text-black rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Tip Calculator</h1>
        <p className="pb-4">
          Enter the bill amount and tip percentage to calculate the total.
        </p>
        <div className="flex flex-col ">
          <label htmlFor="BillAmount" className="pr-4 pb-3">
            Bill amount:
          </label>
          <input
            type="number"
            id="BillAmount"
            placeholder="Bill amount..."
            className="pl-2 rounded-md shadow-md "
            value={billAmount}
            onChange={(e) => setBillAmount(Number(e.target.value))}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <label htmlFor="TipPercentage" className="pr-4 pb-3">
            Tip percentage:
          </label>
          <input
            type="number"
            id="TipPercentage"
            placeholder="Tip percentage..."
            className="pl-2 rounded-md shadow-md "
            value={tipPercentage}
            onChange={(e) => setTipPercentage(Number(e.target.value))}
          />
        </div>
        <button
          onClick={handleCalculate}
          className="mt-10 bg-green-500 w-full text-white text-xl rounded-lg"
        >
          Calculate
        </button>
        <h2 className="mt-9 text-xl">Total: {total}$</h2>
      </div>
    </div>
  );
};

export default App;
