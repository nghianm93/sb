import  { useState, useEffect } from 'react';
import React from 'react';
import '../../App.css';
import Hamster from '../../icons/Hamster';
import { binanceLogo, dailyCipher, dailyReward, dollarCoin, mainCharacter } from '../../images';
import Info from '../../icons/Info';
import Settings from '../../icons/Settings';
import Mine from '../../icons/Mine';
import Friends from '../../icons/Friends';
import Coins from '../../icons/Coins';

interface BottomBarProps {
    onItemClick: (component: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onItemClick }) => {
    const [activeBottomBarItem, setActiveBottomBarItem] = useState('surebet');
    const handleClickBottomBarItem = (item) => {
        setActiveBottomBarItem(item);
        onItemClick(item);
    };
    return(
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
            <div  onClick={() => handleClickBottomBarItem('surebet')} // Khi click sẽ set 'exchange' là active
                  className={`text-center text-[#85827d] w-1/5 ${activeBottomBarItem === 'surebet' ? 'bg-[#1c1f24] m-1 p-2 rounded-2xl' : 'text-[#85827d]'}`}>
                <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
                <p className="mt-1">Surebet</p>
            </div>
            <div  onClick={() => handleClickBottomBarItem('mine')} // Khi click sẽ set 'exchange' là active
                  className={`text-center text-[#85827d] w-1/5 ${activeBottomBarItem === 'mine' ? 'bg-[#1c1f24] m-1 p-2 rounded-2xl' : 'text-[#85827d]'}`}>
                <Mine className="w-8 h-8 mx-auto" />
                <p className="mt-1">Mine</p>
            </div>
            <div onClick={() => handleClickBottomBarItem('friends')} // Khi click sẽ set 'exchange' là active
                 className={`text-center text-[#85827d] w-1/5 ${activeBottomBarItem === 'friends' ? 'bg-[#1c1f24] m-1 p-2 rounded-2xl' : 'text-[#85827d]'}`}>
                <Friends className="w-8 h-8 mx-auto" />
                <p className="mt-1">Friends</p>
            </div>
            <div onClick={() => handleClickBottomBarItem('earn')} // Khi click sẽ set 'exchange' là active
                 className={`text-center text-[#85827d] w-1/5 ${activeBottomBarItem === 'earn' ? 'bg-[#1c1f24] m-1 p-2 rounded-2xl' : 'text-[#85827d]'}`}>
                <Coins className="w-8 h-8 mx-auto" />
                <p className="mt-1">Earn</p>
            </div>
            {/*<div className="text-center text-[#85827d] w-1/5">*/}
            {/*    <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />*/}
            {/*    <p className="mt-1">Airdrop</p>*/}
            {/*</div>*/}
        </div>
    )
};

export default BottomBar;