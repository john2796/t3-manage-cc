import { api } from "@/utils/api";
import { type Course } from "@prisma/client";
import { type NextPage } from "next";
import { Head } from "next/document";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

const Courses: NextPage = () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const courses = api.course.getCourses.useQuery();
  const createCourseMutation = api.course.createCourse.useMutation();
  const courseQuery = api.course.getCourseById.useQuery(
    {
      courseId,
    },
    {
      enabled: !!courseId,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return (
    <>
      <Head>
        <title>Mange Courses</title>
      </Head>

      <form
        onSubmit={async () => {
          await createCourseMutation.mutateAsync({
            courseId,
            title: name,
          });
        }}
      >
        <input
          placeholder="name your course here"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="describe your course a bit"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
        <div>{courseQuery?.data && JSON.stringify(courseQuery.data)}</div>
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
