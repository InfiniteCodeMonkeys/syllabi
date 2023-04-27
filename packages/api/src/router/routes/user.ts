import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const userRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    try {
      const user = await prisma?.user.findUnique({
        where: {
          id: userId,
        },
      });

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
  like: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.auth.userId;

      try {
        prisma?.user.update({
          where: {
            id: user,
          },
          data: {
            savedCourses: { push: input.id },
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
  unlike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.auth.userId;

      const courses = await prisma?.user.findUnique({
        where: {
          id: user,
        },
        select: {
          savedCourses: true,
        },
      });

      try {
        prisma?.user.update({
          where: {
            id: user,
          },
          data: {
            savedCourses: {
              set: courses?.savedCourses.filter(
                (course) => course !== input.id,
              ),
            },
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
