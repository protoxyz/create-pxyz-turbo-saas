import { Heading, Text } from "../typography";

export function PageHeader({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="bg-white px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Text align="center" weight="bold" color="primary">
          {subtitle}
        </Text>
        <Heading className="mt-2 ">{title}</Heading>
        <Text align="center" className="mt-6 ">
          {description}
        </Text>
      </div>
    </div>
  );
}
