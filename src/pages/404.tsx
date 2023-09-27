import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page404: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    void router.replace("/");
  }, [router]);

  return null;
};

export default Page404;
