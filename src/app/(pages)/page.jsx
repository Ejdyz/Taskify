import LandingPage from "@/components/landingPage/LandingPage"
import MainPage from "@/components/mainPage/MainPage"
import { auth } from "@/lib/auth/auth"

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <LandingPage />
    );
  }

  return (
    <MainPage session={session} />
  );
}
