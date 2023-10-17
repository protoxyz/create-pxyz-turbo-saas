import { UserProfile } from "@protoxyz/types";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function EmailList({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-8">
      {user?.emailAddresses?.map((email) => (
        <div className="flex items-center" key={email.id}>
          <div className="flex flex-1 justify-between font-medium">
            <div className="flex flex-col gap-1">
              <p className="text-md font-medium leading-none">{email.email}</p>
              <p className="text-muted-foreground text-sm">
                {new Date(email.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-1">
              {email.verifiedAt && (
                <Badge variant="success" className="gap-1">
                  <Check className="h-4 w-4" /> verified
                </Badge>
              )}

              {user?.primaryEmailId === email.id ? (
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
