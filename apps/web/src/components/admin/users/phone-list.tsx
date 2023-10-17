import { UserProfile } from "@protoxyz/types";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function PhoneList({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-8">
      {user?.phoneNumbers?.map((phone) => (
        <div className="flex items-center" key={phone.id}>
          <div className="flex flex-1 justify-between font-medium">
            <div className="flex flex-col gap-1">
              <p className="text-md font-medium leading-none">{phone.phone}</p>
              <p className="text-muted-foreground text-sm">
                {new Date(phone.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-1">
              {phone.verifiedAt && (
                <Badge variant="success" className="gap-1">
                  <Check className="h-4 w-4" /> verified
                </Badge>
              )}

              {user.primaryPhoneId === phone.id ? (
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-4 w-4" />
                  primary
                </Badge>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
