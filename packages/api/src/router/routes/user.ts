import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const userRouter = router({
  add: publicProcedure
    .input(
      z.object({
        email_address: z.string(),
        verificationStatus: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        id: z.string(),
        last_sign_in_at: z.string(),
        profile_image_url: z.string(),
        username: z.string(),
        birthday: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        prisma?.user.create({
          data: {
            email: input.email_address,
            emailVerified: input.verificationStatus,
            firstName: input.first_name,
            lastName: input.last_name,
            clerkId: input.id,
            lastSignInAt: input.last_sign_in_at,
            profileImageURL: input.profile_image_url,
            username: input.username,
            birthday: input.birthday,
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
