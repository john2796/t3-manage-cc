import { env } from "@/env.mjs";

export function getImageUrl(id: string) {
  // return `${process.env.S3_DB_URL}/${env.NEXT_PUBLIC_S3_BUCKET_NAME}/${id}`;
  const placeholderImage =
    "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png";
  return id ? `http://localhost:4568/test-bucket/${id}` : placeholderImage;
}
