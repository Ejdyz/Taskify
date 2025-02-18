"use client"
// Hooks
import dynamic from 'next/dynamic';
// Components
import { Suspense } from "react";
import { SparklesCTALoading } from '@/components/pages/landing-page/SparklesCTA';
import GridComponent from "@/components/pages/landing-page/GridComponent";

const SparklesCTA = dynamic(() => import('@/components/pages/landing-page/SparklesCTA'), { ssr: false, loading: () => <SparklesCTALoading title={"Taskify"} /> });
const WorldMapDemo = dynamic(() => import('@/components/pages/landing-page/WorldMap'), { ssr: false });

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
