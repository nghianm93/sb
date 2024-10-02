import React, {useState} from 'react';
import './App.css';
import Surebet from "./components/surebet/surebet";
import BottomBar from "./components/bottomBar/bottomBar";

const App: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>('surebet');

    const handleItemClick = (component: string) => {
        setActiveComponent(component);
    };
  return (
    <div>

            {activeComponent === 'surebet' && <Surebet/>}
            <BottomBar onItemClick={handleItemClick}/>

    </div>
  );
};

export default App;
