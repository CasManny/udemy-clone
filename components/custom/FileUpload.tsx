"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface IFileUpload {
  value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
const FileUpload = ({ value, onChange, endpoint }: IFileUpload) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {value && (
        <Image
          src={value}
          alt={"course banner"}
          width={500}
          height={500}
          className="w-[280px] h-[200px] object-cover rounded-lg"
        />
      )}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0]?.url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[280px] h-[200px]"
      />
    </div>
  );
};

export default FileUpload;
