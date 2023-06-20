import { env } from "@/env.mjs";

export function gegtImageUrl(id: string) {
  return `http://localhost:9000/${env.NEXT_PUBLIC_S3_BUCKET_NAME}/${id}`;
}
