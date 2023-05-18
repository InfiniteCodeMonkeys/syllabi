import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { User } from "@acme/db";

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
  like: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const user = await prisma?.user.findUnique({
        where: {
          clerkId: userId,
        },
      });

      const node = await prisma?.nodes.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!node) {
        throw new Error("Node not found");
      }
      try {
        prisma?.nodes.update({
          where: {
            id: input.id,
          },
          data: {
            savedBy: {
              create: [user],
            },
          },
        });

        prisma?.user.update({
          where: {
            clerkId: userId,
          },
          data: {
            savedCourses: {
              connect: [node],
            },
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
      const userId = ctx.auth.userId;

      const courses = await prisma?.user.findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          savedCourses: true,
        },
      });

      const node = await prisma?.nodes.findUnique({
        where: {
          id: input.id,
        },
      });

      try {
        prisma?.nodes.update({
          where: {
            id: input.id,
          },
          data: {
            savedBy: {
              set: node?.savedBy.filter((user: User) => user.id !== userId),
            },
          },
        });

        prisma?.user.update({
          where: {
            id: userId,
          },
          data: {
            savedCourses: {
              set: courses?.savedCourses.filter(
                (course) => course.id !== input.id,
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
