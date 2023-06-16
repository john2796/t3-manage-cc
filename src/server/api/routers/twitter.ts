import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getExample: protectedProcedure
    .input(
      z.object({
        exampleId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.example.findUnique({
        where: {
          id: input.exampleId,
        },
      });
    }),

  // getTweetById: protectedProcedure
  //   .input(
  //     z.object({
  //       tweetId: z.string(),
  //     })
  //   )
  //   .query(({ ctx, input }) => {
  //     return ctx.prisma.example.findUnique({
  //       where: {
  //         id: input.tweetId,
  //       },
  //       // include: {
  //       //   sections: true,
  //       // },
  //     });
  //   }),
  // getCourses: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany({
  //     where: {
  //       userId: ctx.session.user.id,
  //     },
  //   });
  // }),
  // createCourse: protectedProcedure
  //   .input(z.object({ title: z.string(), description: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session.user.id;
  //     const newCourse = await ctx.prisma.course.create({
  //       data: {
  //         title: input.title,
  //         description: input.description,
  //         userId: input.userId,
  //       },
  //     });
  //     return newCourse;
  //   }),
});
