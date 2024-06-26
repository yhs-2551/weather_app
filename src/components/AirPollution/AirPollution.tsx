"use client";

import { useGlobalContext } from "@/context/global-context";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { thermo } from "@/utils/icon";
import { Progress } from "@/components/ui/progress";
import { airQualityIndexText } from "@/utils/misc";

function AirPollution() {
    interface AirQualityIndexText {
        rating: number;
        description: string;
    }

    const { airQuality } = useGlobalContext();
    
    const airQualityList = airQuality?.list;

    if (!airQuality || !airQualityList) {
        return (
            <Skeleton className='h-[1rem] w-full col-span-2 md:col-span-full' />
        );
    }

    const airQualityIndex: number = airQualityList[0].main.aqi * 10;

    console.log("airQualityIndex", airQuality);

    const filteredIndexTextObj: AirQualityIndexText | undefined =
        airQualityIndexText.find((item) => {
            return item.rating === airQualityIndex;
        });

    return (
        <div className='air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <h2 className='flex items-center gap-2 font-medium'>
                {thermo} 대기 오염
            </h2>
            <Progress value={airQualityIndex} max={100} className='dust' />
            <p className='text-sm'>
                Air quality is {filteredIndexTextObj?.description}&#46;
            </p>
        </div>
    );
}

export default AirPollution;
