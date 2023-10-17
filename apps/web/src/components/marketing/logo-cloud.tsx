import Image from "next/image";
import Link from "next/link";
import { meta } from "@acme/shared";

import Images from "../images";
import { Heading, Text } from "../typography";
import { Button } from "../ui/button";

export default function LogoCloud() {
  return (
    <div className="w-full py-4 lg:py-8">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className=" w-full items-center gap-x-8 gap-y-16   ">
          <Text size="md" className="text-muted-foreground/50" weight="light">
            Join 4,000+ companies and growing
          </Text>

          <div className="mt-8 grid grid-cols-4 gap-4 py-4 lg:grid-cols-8 lg:gap-8">
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />

            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
            <Images.companyPlaceholder className="animate-fadeUp text-muted-foreground h-auto w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
