import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setfile] = useState<File[]>([]);
  const [fileUrl, setfileurl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setfile(acceptedFiles);
      fieldChange(acceptedFiles);
      setfileurl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {
        fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img
                src={fileUrl}
                className="file_uploader-img"
                alt="file_uploader-img"
              />
            </div>
              <p className="file_uploader-label">
                Click or drag photo to replace
              </p>
          </>
        ) : (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              alt="file-upload"
              width={96}
              height={77}
            />
            <h3 className="base-medium text-light-2 mb-3 mt-6">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
            <Button className="shad-button_dark_4">Select from computer</Button>
          </div>
        )
        //   <p>Drop the files here ...</p> :
        //   <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
};

export default FileUploader;
