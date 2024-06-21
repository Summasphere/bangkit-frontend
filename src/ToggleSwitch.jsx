import { useState } from 'react';
import { Switch } from '@headlessui/react';

const ToggleSwitch = ({ initialTab = 'summarizer', onTabSwitch }) => {
  const [isOn, setIsOn] = useState(initialTab === 'summarizer');

  const handleToggle = () => {
    const newTab = isOn ? 'summarizer' : 'analyzer';
    setIsOn(!isOn);
    onTabSwitch(newTab);
  };

  return (
    <Switch
      checked={isOn}
      onChange={handleToggle}
      className={`${isOn ? 'bg-white' : 'bg-gray-200'}
        relative inline-flex h-10 w-20 items-center rounded-full transition-colors duration-200`}
    >
      <span className="sr-only">Toggle Switch</span>
      <span
        className={`${isOn ? 'translate-x-11' : 'translate-x-1'}
        inline-block h-8 w-8 transform rounded-full bg-black transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default ToggleSwitch;