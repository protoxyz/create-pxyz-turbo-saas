import { Feature } from "@acme/shared";
import { icons } from "lucide-react";

import { Skeleton } from "../ui/skeleton";

interface ValueProp {
  title: string;
  subtitle: string;
  description: string;
  // icon: keyof typeof icons;
  features: Feature[];
}

export function ValuePropWithScreenshot({
  title,
  subtitle,
  description,
  // icon,
  features,
}: ValueProp) {
  // const Icon = icons[icon];

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-primary text-base font-semibold leading-7">
                {subtitle}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features?.map((feature) => {
                  const Icon = icons[feature.icon as keyof typeof icons];
                  return (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <Icon
                          className="text-primary absolute left-1 top-1 h-5 w-5"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <Skeleton className="h-full w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
