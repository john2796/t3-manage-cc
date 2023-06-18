import { api } from "@/utils/api";
import { type Course } from "@prisma/client";
import { type NextPage } from "next";
import { Head } from "next/document";
import Image from "next/image";
import { FC } from "react";

const Courses: NextPage = () => {
  const courses = api.course.getCourses.useQuery();
  const createCourseMutation = api.course.createCourse.useMutation();

  return (
    <>
      <Head>
        <title>Mange Courses</title>
      </Head>

      <form>
        <input placeholder="name your course here" type="text" />
        <textarea placeholder="describe your course a bit" />
        <input />
        <button type="submit">Manage</button>
      </form>

      <main>
        <h1>Manage Courses</h1>
        <button>Create course</button>

        <div>
          {courses.data?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </>
  );
};

const CourseCard: FC<{ course: Course }> = ({ course }) => {
  return (
    <div>
      <Image src={course.imageId} alt={course.title} />
      <h2>{course.title}</h2>
      <h2>{course.description}</h2>
      <button> Manage {course.id}</button>
    </div>
  );
};

export default Courses;
