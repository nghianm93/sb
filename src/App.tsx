import React from 'react';
import './App.css';
import Surebet from "./components/surebet/surebet";
import BottomBar from "./components/bottomBar/bottomBar";

const App: React.FC = () => {
  return (
    <div>
        <Surebet/>
        <BottomBar/>
    </div>
  );
};

export default App;
