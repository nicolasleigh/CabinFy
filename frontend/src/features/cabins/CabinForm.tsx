import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropzone from "@/components/DropZone";
import { useState } from "react";
import DropzoneMultiple from "@/components/DropzoneMultiple";
import { numberInputOnWheelPreventChange } from "@/utils/helpers";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  location: z.string(),
  bedroom: z.coerce.number().gt(0, "Must be above 0"),
  regularPrice: z.coerce.number().gt(0, "Must be above 0"),
  discount: z.coerce.number().gt(0, "Must be above 0"),
  image: z.any(),
  images: z.any(),
});

export default function CabinForm() {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      bedroom: 0,
      regularPrice: 0,
      discount: 0,
      image: "",
      images: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const showSelectedImage = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
  };

  const showSelectedImages = (fileList) => {
    const files = [...fileList]; // Convert fileList to array
    const urls = files.map((e) => URL.createObjectURL(e));
    setSelectedImages(urls);
  };

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const fileType = allowedTypes.find((type) => type === acceptedFiles[0].type);
      if (!fileType) {
        form.setValue("image", null);
        form.setError("image", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        form.setValue("image", acceptedFiles[0]);
        showSelectedImage(acceptedFiles[0]);
        form.clearErrors("image");
      }
    } else {
      form.setValue("image", null);
      form.setError("image", {
        message: "Image file is required",
        type: "typeError",
      });
    }
  }

  function handleOnImageClick(acceptedFiles: FileList | null, index: number) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const fileType = allowedTypes.find((type) => type === acceptedFiles[0].type);
      if (fileType) {
        const images = form.getValues("images");
        const imagesArr = [...images]; // Convert FileList into array
        imagesArr[index] = acceptedFiles[0];
        form.setValue("images", imagesArr);
        showSelectedImages(imagesArr);
        form.clearErrors("images");
      }
    }
  }

  function handleOnDropMultiple(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length === 4) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const fileType = allowedTypes.find((type) => type === acceptedFiles[0].type);
      if (!fileType) {
        form.setValue("images", null);
        form.setError("images", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        console.log(acceptedFiles);
        form.setValue("images", acceptedFiles);
        showSelectedImages(acceptedFiles);
        form.clearErrors("images");
      }
    } else {
      form.setValue("images", null);
      form.setError("images", {
        message: "Please select 4 image files",
        type: "typeError",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex  gap-4'>
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Name</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Location</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bedroom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedroom Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    {...field}
                    value={Boolean(field.value) ? field.value : ""}
                    type='number'
                    min={0}
                    onWheel={numberInputOnWheelPreventChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='regularPrice'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    {...field}
                    value={Boolean(field.value) ? field.value : ""}
                    type='number'
                    min={0}
                    onWheel={numberInputOnWheelPreventChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='discount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    {...field}
                    value={Boolean(field.value) ? field.value : ""}
                    type='number'
                    min={0}
                    onWheel={numberInputOnWheelPreventChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Photo</FormLabel>
                <FormControl>
                  <Dropzone
                    {...field}
                    dropMessage={"Drop or select 1 image"}
                    handleOnDrop={handleOnDrop}
                    accept='image/*'
                    selectedImage={selectedImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internal Photos</FormLabel>
                <FormControl>
                  <DropzoneMultiple
                    {...field}
                    dropMessage={"Drop or select 4 images"}
                    handleOnDrop={handleOnDropMultiple}
                    accept='image/*'
                    multiple
                    selectedImages={selectedImages}
                    onChange={handleOnImageClick}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-4 w-full' variant='secondary'>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
