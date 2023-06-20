import AdminDashboardLayout from "@/components/layouts/admin-dashboard-layout";
import { api } from "@/utils/api";
import { gegtImageUrl } from "@/utils/getImageUrl";
import {
  Button,
  FileInput,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconEdit, IconLetterX } from "@tabler/icons-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

interface IUploadFile {
  getPresignedUrl: () => Promise<{
    url: string;
    fields: Record<string, string>;
  }>;
  file: File;
}
async function uploadFileToS3({ getPresignedUrl, file }: IUploadFile) {
  const { url, fields } = await getPresignedUrl();
  const data: Record<string, any> = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name]);
  }
  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

const Courses: NextPage = () => {
  const router = useRouter()
  const courseId = router.query.courseId as string;

  // mutations
  const updateCourseMutation = api.course.updateCourse.useMutation()
  const createSectionMutation = api.course.createSection.useMutation()
  const deleteSection = api.course.deleteSection.useMutation()
  const swapSections = api.course.swapSections.useMutation()
  const createPresignedUrlMutation = api.course.createPresignedUrl.useMutation()
  const createPresignedUrlForVideoMutation = api.course.createPresignedUrlForVideo.useMutation()
  
  // form states
  const updateTitleForm = useForm({
    initialValues: { title: ""}
  })
  const newSectionForm = useForm({
    initialValues: { title: ""}
  })

  // react state
  const [file, setFile] = useState<File | null>(null) 
  const [newSection, setNewSection] = useState<File | null>(null) 

  // query


  return ( 

  )
}
