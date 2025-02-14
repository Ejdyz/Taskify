// Utis
import { auth } from "@/lib/auth/auth";
// Components
import CreateWrapper from "@/components/createPage/CreateWrapper";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  return <CreateWrapper />
};
export default Page;