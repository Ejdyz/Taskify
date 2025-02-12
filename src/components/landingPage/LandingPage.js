"use client"
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import {SparklesCTALoading} from "@/components/landingPage/SparklesCTA";
import GridComponent from "@/components/landingPage/GridComponent";

const SparklesCTA = dynamic(() => import('@/components/landingPage/SparklesCTA'), { ssr: false, loading: () => <SparklesCTALoading title={"Taskify"}/> });
const WorldMapDemo = dynamic(() => import('@/components/landingPage/WorldMap'), { ssr: false });

const LandingPage = () => {
  return (
    <>
    <Suspense fallback={<SparklesCTALoading title={"Taskify"} />}>
      <SparklesCTA title="Taskify" />
    </Suspense>
      <GridComponent />
      <Suspense>
        <WorldMapDemo />
      </Suspense>
      </>
  );
};

export default LandingPage;
