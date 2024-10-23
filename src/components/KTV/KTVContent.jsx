import React from "react";
import { FaTelegram } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { KTVContentData } from "./KTVContentData";

export default function KTVContent() {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className=' grid grid-cols-6 grid-rows-6 gap-2 w-[80rem] h-[53rem]'>
        <div className='col-span-2 row-span-2'>
          <img
            src='https://images.unsplash.com/photo-1654266004611-c4abf9724f67?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full object-cover rounded-md'
          />
        </div>
        <div className='w-full  col-span-2 row-span-4 col-start-1 row-start-3'>
          <article className='rounded-md border border-gray-700 bg-gray-800 p-4 h-full'>
            <div className='flex items-center justify-center w-full flex-col'>
              <h3 className='text-lg font-medium fira-sans-bold text-white'>
                Princess Diamond
              </h3>
              <p className='flow-root text-sm font-medium fira-sans-condensed-regular text-slate-300'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-col'>
              {KTVContentData?.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-center w-full flex-col'
                >
                  <li className='block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600'>
                    <div className='flex items-center justify-between'>
                      <strong className='font-medium text-white fira-sans-regular'>
                        {item.title}
                      </strong>
                      <p className='font-medium fira-sans-condensed-regular text-slate-300'>
                        {item.time}
                      </p>
                    </div>
                    <p className='mt-2 text-xs font-medium fira-sans-condensed-regular text-slate-300'>
                      {item.desc}
                    </p>
                  </li>
                </div>
              ))}
            </div>
            <ul className='w-full mt-4 space-y-2'>
              <li className='block w-full h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600'>
                <div className=' flex items-center gap-1'>
                  <div className='flex items-center fira-sans-condensed-bold px-4 py-2 bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-400 '>
                    <RiKakaoTalkFill className='text-xl mr-2 ' />
                    KakaoTalk
                  </div>
                  <div className='flex items-center fira-sans-condensed-bold px-4 py-2 bg-red-500 rounded-md cursor-pointer hover:bg-red-400'>
                    <SiGmail className='text-xl  mr-2' />
                    Gmail
                  </div>
                  <div className='flex items-center fira-sans-condensed-bold px-4 py-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-300'>
                    <FaTelegram className='text-xl text-black mr-2' />
                    Telegram
                  </div>
                </div>
              </li>
            </ul>
          </article>
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-1'>
          <img
            src='https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full  h-full rounded-md'
          />
        </div>
        <div className='col-span-2 row-span-3 col-start-5 row-start-1'>
          <img
            src='https://images.unsplash.com/photo-1606874687375-9f7bcc517975?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full cover rounded-md'
          />
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-4'>
          <img
            src='https://images.unsplash.com/photo-1584140380141-30f09812653f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8'
            alt=''
            className='w-full h-full  rounded-md'
          />
        </div>
        <div className='col-span-2 row-span-3 col-start-5 row-start-4'>
          <img
            src='https://images.unsplash.com/photo-1650693106433-c924a628fd49?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full '
          />
        </div>
      </div>
    </main>
  );
}
