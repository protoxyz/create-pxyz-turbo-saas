import Link from "next/link";
import { UserProfile } from "@protoxyz/types";
import { format } from "date-fns";
import { Mail, Phone } from "lucide-react";

import { urls } from "@/lib/urls";
import { Heading } from "../typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

const getRecentSignups = async () => {
  const signups = await fetch(
    `https://api.pxyz.dev/api/v0/auth/users?tenantId=${process.env.PXYZ_TENANT_ID}&perPage=5`,
    {
      headers: {
        "x-protocol-public-key": process.env.PXYZ_PUBLIC_KEY ?? "",
        "x-protocol-secret-key": process.env.PXYZ_SECRET_KEY ?? "",
      },
    },
  );

  return await signups.json();
};

export async function RecentSignups() {
  const signups = await getRecentSignups();

  return (
    <Card className="border lg:col-span-2">
      <Link href={urls.admin.users.root()}>
        <CardHeader className="cursor-pointer hover:opacity-50">
          <Heading size="h4">Recent Signups </Heading>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="flex flex-wrap gap-5 ">
          {signups?.data?.map((user: UserProfile) => (
            <Link key={user.id} href={urls.admin.users.user(user.id)}>
              <div className=" flex flex-col items-center gap-2 rounded-lg p-3 pt-5 hover:bg-slate-50">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.imageUri ?? ""} alt="Avatar" />
                  <AvatarFallback>{userInitials(user)}</AvatarFallback>
                </Avatar>
                <div className=" w-full space-y-1 text-center">
                  <div className="text-md text-center font-bold leading-none ">
                    {user.name}
                  </div>
                  <div className="text-muted-foreground text-center text-xs">
                    {new Date(user.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",

                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function userInitials(user: UserProfile) {
  const name = user.name?.split(" ");
  if (name) {
    return name.map((n) => n[0]).join("");
  }
  return "";
}

function emailDisplay(user: UserProfile) {
  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailId,
  );

  if (primaryEmail) {
    return primaryEmail.email;
  }

  return "";
}

function userPhone(user: UserProfile) {
  const primaryPhone = user.phoneNumbers.find(
    (phone) => phone.id === user.primaryPhoneId,
  );

  if (primaryPhone) {
    return primaryPhone.phone;
  }

  return "";
}
