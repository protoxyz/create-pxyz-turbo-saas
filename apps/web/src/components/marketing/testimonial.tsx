import { testimonials } from "@acme/shared";
import { QuoteIcon } from "lucide-react";

import { Heading, Text } from "../typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Testimonial() {
  return (
    <div className="mx-auto flex flex-col gap-16 p-5 px-4 py-32 lg:max-w-5xl">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black">
        <QuoteIcon className="h-8 w-8 text-white" />
      </div>

      <Heading size="h2" className="leading-14 text-center font-normal">
        {testimonials[0]?.body}
      </Heading>

      <div className="mx-auto flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback>{testimonials[0]?.name}</AvatarFallback>
          <AvatarImage src="https://framerusercontent.com/images/ZwHVyDrcGGkoyyZJR4eXyqZrhY.png" />
        </Avatar>

        <div>
          <Heading size="h5" className="font-light">
            {testimonials[0]?.name}
          </Heading>
          <Text>
            {testimonials[0]?.title} at {testimonials[0]?.company}
          </Text>
        </div>
      </div>
    </div>
  );
}
