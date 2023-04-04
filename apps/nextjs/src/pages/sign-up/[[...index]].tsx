import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = ({ referer }: { referer: string }) => {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-800 ">
      <div className="flex h-full w-full">
        <div className="w-full lg:mt-16 lg:h-full lg:w-1/2">
          <div className="mt-16 flex  w-full justify-center">
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              redirectUrl={referer}
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "bottom",
                },
              }}
            />
          </div>
        </div>
        <div className="absolute lg:right-0 lg:h-full lg:w-1/2">
          <Image
            layout="fill"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: {
  req: { headers: { referer: string } };
}) {
  return {
    props: { referer: context.req.headers.referer },
  };
}

export default SignUpPage;
