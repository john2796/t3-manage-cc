import { env } from "@/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const UPLOAD_MAX_FILE_SIZE = 1000000;

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: env.S3_DB_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
});

export const courseRouter = createTRPCRouter({
  getCourseById: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
        include: {
          sections: true,
        },
      });
    }),

  getCourses: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        sections: true,
      },
    });
  }),

  createCourse: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const newCourse = await ctx.prisma.course.create({
        data: {
          title: input.title,
          description: input.description,
          userId: userId,
        },
      });
      return newCourse;
    }),

  updateCourse: protectedProcedure
    .input(z.object({ title: z.string(), courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.course.updateMany({
        where: {
          id: input.courseId,
          userId,
        },
        data: {
          title: input.title,
        },
      });
      return { status: "updated" };
    }),

  deleteCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentCourse = await ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
      });

      if (!currentCourse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "course not found",
        });
      }

      if (currentCourse?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you do not have acces to delete this course",
        });
      }

      await ctx.prisma.course.delete({
        where: {
          id: currentCourse.id,
        },
      });
      return currentCourse;
    }),

  createPresignedUrl: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the course does not exist",
        });
      }

      const imageId = uuidv4();
      await ctx.prisma.course.update({
        where: {
          id: course.id,
        },
        data: {
          imageId,
        },
      });

      return createPresignedPost(s3Client, {
        Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: imageId,
        Fields: {
          key: imageId,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
      });
    }),

  createSection: protectedProcedure
    .input(z.object({ courseId: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const videoId = uuidv4();
      return await ctx.prisma.section.create({
        data: {
          videoId,
          title: input.title,
          courseId: input.courseId,
        },
      });
    }),
  deleteSection: protectedProcedure
    .input(z.object({ sectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.prisma.section.delete({
        where: {
          id: input.sectionId,
        },
      });

      if (!section) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "section not found",
        });
      }

      if (!section.courseId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "section has no course",
        });
      }

      const course = await ctx.prisma.course.findUnique({
        where: {
          id: section.courseId,
        },
      });

      if (course?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you do not have access to this course",
        });
      }

      return section;
    }),
  createPresignedUrlForVideo: protectedProcedure
    .input(z.object({ sectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.prisma.section.findUnique({
        where: {
          id: input.sectionId,
        },
      });
      if (!section) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the section does not exist",
        });
      }
      if (!section.courseId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the section has no course",
        });
      }
      const course = await ctx.prisma.course.findUnique({
        where: {
          id: section.courseId,
        },
      });

      if (course?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you do not have access to this course",
        });
      }

      return createPresignedPost(s3Client, {
        Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: section.videoId,
        Fields: {
          key: section.videoId,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
      });
    }),
});
