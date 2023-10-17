import Link from "next/link";
import { meta, navigation } from "@acme/shared";

import { Button } from "@/components/ui/button";
import { urls } from "@/lib/urls";
import Images from "../../images";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={urls.home()} className="-m-1.5 p-1.5">
            <span className="sr-only">{meta.title}</span>
            <Images.logo className="text-foreground text-2xl font-bold " />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground text-sm font-semibold leading-6"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex lg:flex-1 lg:justify-end">
          <Link
            href={urls.signIn()}
            className="text-muted-foreground text-sm font-semibold leading-6"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>

          <Link href={urls.signUp()}>
            <Button variant="default" size="default">
              Start Free Trial
            </Button>
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}
