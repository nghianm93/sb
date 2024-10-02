import  { useState, useEffect } from 'react';
import React from 'react';
import '../../App.css';
import Hamster from '../../icons/Hamster';
import { binanceLogo, dollarCoin } from '../../images';
import Info from '../../icons/Info';
import Settings from '../../icons/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import CollapsibleTable from '../freeBetTable/freeBetTable.tsx'

const SureBet: React.FC = () => {
    const levelNames = [
        "Bronze",    // From 0 to 4999 coins
        "Silver",    // From 5000 coins to 24,999 coins
        "Gold",      // From 25,000 coins to 99,999 coins
        "Platinum",  // From 100,000 coins to 999,999 coins
        "Diamond",   // From 1,000,000 coins to 2,000,000 coins
        "Epic",      // From 2,000,000 coins to 10,000,000 coins
        "Legendary", // From 10,000,000 coins to 50,000,000 coins
        "Master",    // From 50,000,000 coins to 100,000,000 coins
        "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
        "Lord"       // From 1,000,000,000 coins to ∞
    ];

    const levelMinPoints = [
        0,        // Bronze
        5000,     // Silver
        25000,    // Gold
        100000,   // Platinum
        1000000,  // Diamond
        2000000,  // Epic
        10000000, // Legendary
        50000000, // Master
        100000000,// GrandMaster
        1000000000// Lord
    ];

    const [levelIndex, setLevelIndex] = useState(6);
    const [points, setPoints] = useState(22744524529365);
    const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
    const pointsToAdd = 11;
    const profitPerHour = 126420;


    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAnimationEnd = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    const calculateProgress = () => {
        if (levelIndex >= levelNames.length - 1) {
            return 100;
        }
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
        return Math.min(progress, 100);
    };

    useEffect(() => {
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
            setLevelIndex(levelIndex + 1);
        } else if (points < currentLevelMin && levelIndex > 0) {
            setLevelIndex(levelIndex - 1);
        }
    }, [points, levelIndex, levelMinPoints, levelNames.length]);

    const formatProfitPerHour = (profit: number) => {
        if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
        if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
        if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
        return `+${profit}`;
    };

    useEffect(() => {
        const pointsPerSecond = Math.floor(profitPerHour / 3600);
        const interval = setInterval(() => {
            setPoints(prevPoints => prevPoints + pointsPerSecond);
        }, 1000);
        return () => clearInterval(interval);
    }, [profitPerHour]);

    return (
        <div className="bg-black flex justify-center">
            <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
                <div className="px-4 z-10">
                    {/*User*/}
                    <div className="flex items-center space-x-2 pt-4">
                        <div className="p-1 rounded-lg bg-[#1d2025]">
                            <Hamster size={24} className="text-[#d4d4d4]" />
                        </div>
                        <div>
                            <p className="text-sm">Nikandr (CEO)</p>
                        </div>
                    </div>
                    {/*Level + Setting*/}
                    <div className="flex items-center justify-between space-x-4 mt-1">
                        {/*Level*/}
                        <div className="flex items-center w-1/3">
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="text-sm">{levelNames[levelIndex]}</p>
                                    <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                                </div>
                                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                                    <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                                        <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Setting*/}
                        <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
                            <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
                            <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
                            <div className="flex-1 text-center">
                                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                                <div className="flex items-center justify-center space-x-1">
                                    <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                                    <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                                    <Info size={20} className="text-[#43433b]" />
                                </div>
                            </div>
                            <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
                            <Settings className="text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative  z-0 gradient-effect">
                    <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                            <Tab icon={<PhoneIcon />} label="RECENTS" />
                            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                            <Tab icon={<PersonPinIcon />} label="NEARBY" />
                        </Tabs>
                        {/*Daily Block*/}
                        {/*<div className="px-4 mt-6 flex justify-between gap-2">*/}
                        {/*    <div onClick={() => handleClickDailyItem('free')}*/}
                        {/*        className={`bg-[#272a2f] rounded-lg px-4 py-2 w-full relative ${activeDailyItem == 'free' ? 'shadow-effect' : ''}`}>*/}
                        {/*        <div className="dot"></div>*/}
                        {/*        <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />*/}
                        {/*        <p className="text-[10px] text-center text-white mt-1">Kèo Miễn Phí</p>*/}
                        {/*        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>*/}
                        {/*    </div>*/}
                        {/*    <div onClick={() => handleClickDailyItem('premium')}*/}
                        {/*         className={`bg-[#272a2f] rounded-lg px-4 py-2 w-full relative ${activeDailyItem == 'premium' ? 'shadow-effect' : ''}`}>*/}
                        {/*        <div className="dot"></div>*/}
                        {/*        <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />*/}
                        {/*        <p className="text-[10px] text-center text-white mt-1">Kèo Cao Cấp</p>*/}
                        {/*        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>*/}
                        {/*    </div>*/}

                        {/*</div>*/}
                        {/*Daily Block*/}
                        {/*Amount Exchange*/}
                        {/*<div className="px-4 mt-4 flex justify-center">*/}
                        {/*    <div className="px-4 py-2 flex items-center space-x-2">*/}
                        {/*        <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />*/}
                        {/*        <p className="text-4xl text-white">{points.toLocaleString()}</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*Amount Exchange*/}
                        {/*Hamster Coin*/}
                        {/*<div className="px-4 mt-4 flex justify-center">*/}
                        {/*    <div*/}
                        {/*        className="w-80 h-80 p-4 rounded-full circle-outer"*/}
                        {/*        onClick={handleCardClick}*/}
                        {/*    >*/}
                        {/*        <div className="w-full h-full rounded-full circle-inner">*/}
                        {/*            <img src={mainCharacter} alt="Main Character" className="w-full h-full" />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*Hamster Coin*/}
                        <div className="mt-[200px]">test</div>
                        <CollapsibleTable/>
                    </div>
                </div>

            </div>

            {/* Bottom fixed div */}


            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
                    style={{
                        top: `${click.y - 42}px`,
                        left: `${click.x - 28}px`,
                        animation: `float 1s ease-out`
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                    {pointsToAdd}
                </div>
            ))}
        </div>
    );
};

export default SureBet;
