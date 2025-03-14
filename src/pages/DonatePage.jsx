import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import  RadioGroup  from "../components/ui/RadioGroup";


function DonatePage() {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [message, setMessage] = useState("");
  const [donationType, setDonationType] = useState("One-time");
  

  // const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const recommendedAmounts = [300, 100, 50, 25];

  const handleDonate = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    let donationMessage = "";
    if (donationType === "one-time") {
      donationMessage = `Thank you for your one-time donation of $${amount}!`;
    } else if (donationType === "weekly") {
      donationMessage = `Thank you! You've committed to donating $${amount} weekly.`;
    } else if (donationType === "monthly") {
      donationMessage = `Thank you! You've committed to donating $${amount} monthly.`;
    }


    setMessage(donationMessage);
    // Here, integrate payment processing logic (e.g., Stripe, PayPal API call)
    
  };

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setAmount(amount.toString());
  };

  const handleInputChange = (e) => {
    const inputAmount = e.target.value;
    const isValidNumber = !isNaN(inputAmount) && inputAmount > 0;
    
    setAmount(inputAmount);
    setSelectedAmount(null);
    setError(!isValidNumber || inputAmount <= 0);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">Donate to We Independent</h2>
          <p className="text-gray-500 mb-8 text-center">Your donation helps us continue our mission.</p>
          
          <RadioGroup
            className="space-y-4"
            options = {[
              { label: "One-time", value: "One-time" },
              { label: "Weekly", value: "Weekly" },
              { label: "Monthly", value: "Monthly" },
            ]}
            selectedValue={donationType}
            onChange={setDonationType}
          />
          <p className="text-gray-500 mb-4 text-center">Choose a {donationType} amount</p>

          {/* Recommended Amounts */}
          <div className="flex flex-col space-y-2 mb-4">
            {recommendedAmounts.map((amount) => (
              <label key={amount} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="donationAmount"
                  value={amount}
                  checked={selectedAmount === amount}
                  onChange={() => handleSelectAmount(amount)}
                  className="form-radio text-blue-600"
                />
                <span className="text-lg font-medium">${amount}</span>
                </label>
              ))}
          </div>
          {/* Custom Amount Input */}
          <Input 
            className="mt-4"
            type="number" 
            placeholder="Enter donation amount" 
            value={amount} 
            onChange={handleInputChange}
            hasError={error}
            errorMessage="Please enter a valid donation amount."
          />

          {/* Donate Button */}
          <div className="flex justify-center mt-8"> 
              <Button className="w-full mt-4" onClick={handleDonate}>Continue</Button>
          </div>
          {/* Confirmation Message */}
          {message && <p className="text-green-600 text-center mt-2">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default DonatePage;
