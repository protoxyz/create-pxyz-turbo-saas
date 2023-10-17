import Link from "next/link";
import { UserProfile } from "@protoxyz/types";
import { ArrowLeft, User } from "lucide-react";

import { EmailList } from "@/components/admin/users/email-list";
import { PhoneList } from "@/components/admin/users/phone-list";
import { Container } from "@/components/container";
import { Heading } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urls } from "@/lib/urls";

const getUser = async ({
  userId,
}: {
  userId: string;
}): Promise<UserProfile> => {
  const url = new URL(`https://api.pxyz.dev/api/v0/auth/users/${userId}`);

  const user = await fetch(url.toString(), {
    headers: {
      "x-protocol-public-key": process.env.PXYZ_PUBLIC_KEY ?? "",
      "x-protocol-secret-key": process.env.PXYZ_SECRET_KEY ?? "",
    },
  });

  return await user.json();
};

export default async function AdminUsersPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser({ userId: params.userId });

  return (
    <Container>
      <Link href={urls.admin.users.root()} className="mt-5">
        <Button variant="secondary">
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Button>
      </Link>

      <div className="grid grid-cols-2 gap-5">
        <Card className="col-span-3">
          <CardHeader className="flex flex-col items-center gap-5">
            <CardTitle className="flex flex-col items-center">
              <Avatar className="h-32 w-32 flex-shrink">
                <AvatarFallback>
                  <User className="h-16 w-16 text-gray-200" />
                </AvatarFallback>
                {user.imageUri && (
                  <AvatarImage src={user.imageUri ?? ""}></AvatarImage>
                )}
              </Avatar>
              <Heading size="h3">{user.name}</Heading>
            </CardTitle>
            <CardDescription>
              #{user.id}, created {new Date(user.createdAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Heading size="h4">Emails</Heading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmailList user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Heading size="h4">Phones</Heading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PhoneList user={user} />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
