import React from 'react';
import { RadioGroupItem } from './radio-group';
import { Label } from './label';

interface StyledRadioProps {
  value: string;
  label: string;
}

const StyledRadio: React.FC<StyledRadioProps> = ({ value, label }) => {
  return (
    <div className="flex items-center space-x-2 bg-yellow-500/20 p-4 rounded-md hover:bg-yellow-500/30 cursor-pointer">
      <RadioGroupItem value={value} id={`option-${value}`} />
      <Label
        htmlFor={`option-${value}`}
        className="cursor-pointer w-full text-left">
        {label}
      </Label>
    </div>
  );
};

export default StyledRadio;
