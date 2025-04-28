import MatcherForm from "@/components/matcher-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center md:justify-normal md: items-center p-12">
      <MatcherForm />
    </div>
  );
}
