import { ProtocolAuthProvider } from "@protoxyz/auth/client";
import { AuthAppearance } from "@protoxyz/themes";

const appearance: AuthAppearance = {
  layout: {
    logoPlacement: "none",
  },
};

export default function RootAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtocolAuthProvider appearance={appearance}>
      {children}
    </ProtocolAuthProvider>
  );
}
