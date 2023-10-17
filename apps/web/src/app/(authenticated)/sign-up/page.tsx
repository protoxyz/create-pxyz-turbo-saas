import { SignUp } from "@protoxyz/components";

export default function SignUpPage() {
  return (
    <div className="p-5">
      <SignUp afterSignUpRedirectUri={"/onboard/create-project"} />
    </div>
  );
}
