import Link from "next/link";
import { meta, navigation } from "@acme/shared";

import { Icons } from "../icons";

export function Footer() {
  return (
    <footer className="border-muted-foreground/10 border-t bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.footer.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => {
            const Icon = (Icons as any)[item.name];

            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
              </Link>
            );
          })}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} {meta.title} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
