import { useEffect, useState } from "react";
import city from "../../assets/img/manilanight.jpg"

export const HeroBanner = ({darkMode}) => {
    const [currentTimePHT, setCurrentTimePHT] = useState('');
    const [currentTimeKST, setCurrentTimeKST] = useState('');
    const [currentTimeJST, setCurrentTimeJST] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTimePHT(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' }));
            setCurrentTimeKST(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul' }));
            setCurrentTimeJST(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo' }));
        }, 1000)
        return () => clearInterval(interval);
    }, [] );

    return (
       <div className={darkMode && "dark"} >
         <div className="relative w-full bg-no-repeat bg-cover bg-fixed " style={{ backgroundImage: `url(${city})`, height: 400 }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-black mb-4 font-serif">Philtong</h1>
                    <h2 className="text-3xl font-serif">필리핀 정보통(Philippines information network)</h2>
                </div>
                <div className="flex justify-center mt-8 space-x-8">
                    <div className=" rounded-full px-6 py-2">
                        <span className="text-lg">{currentTimePHT}</span>
                        <span className="block">Philippines</span>
                    </div>
                    <div className=" rounded-full px-6 py-2">
                        <span className="text-lg">{currentTimeKST}</span>
                        <span className="block">Korea</span>
                    </div>
                    <div className=" rounded-full px-6 py-2">
                        <span className="text-lg">{currentTimeJST}</span>
                        <span className="block">Japan</span>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
}