import { SignIn } from "@protoxyz/components";

export default function SignInPage() {
  return (
    <div className="p-5">
      <SignIn afterSignInRedirectUri="/dashboard" />
    </div>
  );
}
