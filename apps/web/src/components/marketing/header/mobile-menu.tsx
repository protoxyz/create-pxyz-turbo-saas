"use client";

import Link from "next/link";
import { meta, navigation } from "@acme/shared";
import { MenuIcon, XIcon } from "lucide-react";

import Images from "@/components/images";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function MobileMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="fixed ">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="sr-only">{meta.title}</span>
            <Images.logo className="h-12 w-auto text-emerald-600" />
          </Link>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              <Link
                href="/sign-in"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
