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
       <div className={`flex ${darkMode && "dark"}`} >
            <div className="flex flex-col border  px-2">
                    <img
                        src="https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
                        alt="Left Image"
                        className="max-auto object-cover"
                    />
                    <img
                        src="https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
                        alt="Left Image"
                        className="max-auto object-cover"
                    />
                </div>
         <div className="relative w-full bg-no-repeat bg-cover bg-fixed mb-10" style={{ backgroundImage: `url(${city})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-black mb-4 font-serif">Philippine Zone</h1>
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
        <div className="border px-2">
                    <img
                        src="https://www.rockstarktvmanila.com/wp-content/uploads/2022/12/deluxe-1-maroon-5-600x600.jpg"
                        alt="Left Image"
                        className="w-auto h-full object-cover"
                    />
                </div>
       </div>
    );
}