import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useRef } from "react";
import { Card, CardContent } from "./ui/card";

interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      className,
      classNameWrapper,
      dropMessage,
      handleOnDrop,
      accept,
      selectedImage,
      selectedImages,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        console.log("click");
        inputRef.current.click();
      }
    };
    return (
      <div className='flex flex-col'>
        <Card
          ref={ref}
          className={cn(
            `border hover:cursor-pointer rounded-md shadow-none hover:bg-muted md:w-60 h-10`,
            classNameWrapper
          )}
        >
          <CardContent
            className='flex flex-col items-center justify-center space-y-2 px-2 py-4 text-sm h-full '
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <div className='flex items-center justify-center text-muted-foreground '>
              <span className=''>{dropMessage}</span>

              <Input
                {...props}
                value={undefined}
                ref={inputRef}
                type='file'
                className={cn("hidden", className)}
                accept={accept}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnDrop(e.target.files)}
                onClick={(e) => (e.target.value = null)}
              />
            </div>
          </CardContent>
        </Card>

        <div className='grid grid-cols-2 gap-1 self-center'>
          {selectedImages &&
            selectedImages.length > 0 &&
            selectedImages.map((elem, i) => (
              <div className='mt-2' key={i}>
                <input
                  accept={accept}
                  onChange={(e) => onChange(e.target.files, i)}
                  name={i}
                  id={i}
                  type='file'
                  hidden
                />
                <label htmlFor={i} tabIndex={0} className='cursor-pointer'>
                  <img className='w-28  aspect-video rounded-md' src={elem} alt='' />
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default Dropzone;
