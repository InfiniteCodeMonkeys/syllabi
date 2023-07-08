import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const userRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const user = await prisma?.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    try {
      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  }),
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
