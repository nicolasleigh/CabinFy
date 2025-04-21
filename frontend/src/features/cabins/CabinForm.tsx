import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dropzone from "@/components/Dropzone";
import { useEffect, useState } from "react";
import DropzoneMultiple from "@/components/DropzoneMultiple";
import { formatBytes, numberInputOnWheelPreventChange } from "@/utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { useTranslation } from "react-i18next";

const MAX_IMAGE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const validateImage = (file, ctx) => {
  if (!file) return;
  if (file.size > MAX_IMAGE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Image cannot be greater than ${MAX_IMAGE_SIZE}`,
      // message: i18n.t("posterTooLargeMessage", {
      //   maxSize: formatBytes(MAX_IMAGE_SIZE),
      // }),
      fatal: true,
    });
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please upload a valid image file (JPEG, PNG, or WebP)",
      // message: i18n.t("Please upload a valid image file (JPEG, PNG, or WebP)"),
      fatal: true,
    });
  }
};

const commonValidations = {
  name: z.string().nonempty("Name cannot be empty").max(50, "Name cannot be greater than 50 characters"),
  location: z.string().nonempty("Location cannot be empty").max(50, "Location cannot be greater than 50 characters"),
  bedroom: z.coerce.number().gt(0, "Must be above 0"),
  regularPrice: z.coerce.number().gt(0, "Must be above 0"),
  discount: z.coerce.number().gte(0, "Must be or above 0"),
};

const formSchema = z.object({
  ...commonValidations,
  image: z
    .instanceof(File, {
      message: "Please select an image file",
    })
    .superRefine(validateImage),
  images: z.instanceof(FileList, {
    message: "Please select image files",
  }),
});

const formUpdateSchema = z.object({
  ...commonValidations,
  image: z.any().optional().superRefine(validateImage),
  images: z.any().optional(),
});

export default function CabinForm({ isUpdate = false, initialState, onSubmit }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { t } = useTranslation();

  let form: UseFormReturn<z.infer<typeof formSchema>>;
  if (isUpdate) {
    form = useForm<z.infer<typeof formUpdateSchema>>({
      resolver: zodResolver(formUpdateSchema),
      defaultValues: {
        name: "",
        location: "",
        bedroom: 0,
        regularPrice: 0,
        discount: 0,
        image: undefined,
        images: [],
      },
    });
  } else {
    form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        location: "",
        bedroom: 0,
        regularPrice: 0,
        discount: 0,
        image: undefined,
        images: [],
      },
    });
  }

  useEffect(() => {
    if (initialState) {
      form.setValue("name", initialState.name);
      form.setValue("bedroom", initialState.bedroom);
      form.setValue("discount", initialState.discount);
      form.setValue("regularPrice", initialState.regularPrice);
      form.setValue("location", initialState.location);
      setSelectedImage(initialState.image);
      const imageArr = initialState.images.map((elem) => elem.url);
      // setSelectedImages(initialState.images);
      setSelectedImages(imageArr);
    }
  }, []);

  // const handleSubmit = (values: z.infer<typeof formSchema>) => {
  //   const formData = new FormData();
  //   for (const [key, value] of Object.entries(values)) {
  //     formData.append(key, value);
  //   }
  //   onSubmit(formData);
  // };

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (isUpdate) {
      // editCabin({ values,initialState.id },onSuccess:()=>form.reset());
      editCabin(
        {
          newCabinData: {
            ...values,
          },
          id: initialState.id,
        },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } else {
      createCabin(values, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
    onSubmit();
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex  gap-4'>
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cabinName")}</FormLabel>
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
                <FormLabel>{t("cabinLocation")}</FormLabel>
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
                <FormLabel>{t("bedroomQuantity")}</FormLabel>
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
                <FormLabel>{t("cabinPrice")}</FormLabel>
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
                <FormLabel>{t("cabinDiscount")} (%)</FormLabel>
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
                <FormLabel>{t("coverPhoto")}</FormLabel>
                <FormControl>
                  <Dropzone
                    {...field}
                    dropMessage={t("DropzoneImage")}
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
                <FormLabel>{t("internalPhotos")}</FormLabel>
                <FormControl>
                  <DropzoneMultiple
                    {...field}
                    dropMessage={t("DropzoneImages")}
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
            {isUpdate ? t("editButton") : t("addButton")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
