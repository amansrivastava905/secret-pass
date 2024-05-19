import React from 'react';
import { RadioGroupItem } from './radio-group';

interface StyledRadioProps {
  value: string;
  label: string;
}

const StyledRadio: React.FC<StyledRadioProps> = ({ value, label }) => {
  return (
    <div className="flex items-center space-x-2 bg-yellow-500/20 py-2 px-4 rounded-md hover:bg-yellow-500/30 cursor-pointer">
      <RadioGroupItem value={value} id={`option-${value}`} />
      <label
        htmlFor={`option-${value}`}
        className="cursor-pointer w-full text-left">
        {label}
      </label>
    </div>
  );
};

export default StyledRadio;
