/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useDeleteProductMutation, useUpdateProductMutation } from "../redux/feature/productManage/productApi";
import CustomInputField from "../components/ui/CustomInputField";
import { Label } from "../components/ui/label";
import { IProduct } from "../types/type";
import { uploadImageToCloudinary } from "../utils/CloudinaryUpload";

// Define validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().min(1, "Price cannot be 0."),
  quantity: z.number().min(1, "Quantity cannot be 0."),
  category: z.enum(["Pen", "Pencil", "Notebook", "Paper", "Protractor", "Eraser", "Sharpener", "Ruler", "Marker", "Glue"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  model: z.string().min(1, "Model is required."),
  image: z.string().optional(), // Include image in schema
});

const EditProductDetails = ({ product }: { product: IProduct }) => {
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: undefined,
      model: "",
      image: "",
    },
  });

  const { reset } = form;
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    reset({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      category: product?.category as "Pen" | "Pencil" | "Notebook" | "Paper" | "Protractor" | "Eraser" | "Sharpener" | "Ruler" | "Marker" | "Glue" | undefined,
      model: product?.model || "",
      image: product?.image || "",
    });
  }, [product, reset]);

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const toastId = toast.loading("Updating product...");

    try {
      let imageUrl = data.image;
      if (image) {
        // console.log("Uploading new image...");
        imageUrl = await uploadImageToCloudinary(image);
      }

      const updateData = { ...data, image: imageUrl };
      // console.log("Submitting updated data:", updateData);

      // console.log("Product ID:", product._id);

      // const res = await updateProduct({ data: updateData, id: product._id }).unwrap();

      const res = await updateProduct({ productId: product._id, productData: updateData }).unwrap();

      console.log("Update Response:", res);

      toast.success("Product updated successfully!", { id: toastId });
      reset();
      setImage(null);
      setOpen(false);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update product.", { id: toastId });
    }
  };

  const handleDeleteProduct = async (id:string) => {
    const toastId = toast.loading("Deleting product...");
    try {
       await deleteProduct(id);
      toast.success("Product deleted successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete product.", { id: toastId });
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 mb-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setOpen(!open)}>
            <FaEdit className="text-black cursor-pointer mx-auto hover:scale-110 w-5 h-5" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="flex justify-center font-bold text-green-600 border-b-2 border-green">Edit Product</DialogTitle>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
          <CustomInputField name="name" label="Product Name" placeholder="Enter product name" type="text" control={form.control} />
          <CustomInputField name="model" label="Model" placeholder="Enter product model" type="text" control={form.control} />
        </div>

        <Label>Product Image</Label>
        <Input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])} />

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Pen", "Pencil", "Notebook", "Paper", "Protractor", "Eraser", "Sharpener", "Ruler", "Marker", "Glue"].map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
          <CustomInputField name="price" label="Price" placeholder="Enter price" type="number" control={form.control} />
          <CustomInputField name="quantity" label="Quantity" placeholder="Enter quantity" type="number" control={form.control} />
        </div>

        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2">
          Update Product
        </Button>
      </form>
    </Form>
        </DialogContent>
      </Dialog>

      <FaTrash className="text-red-500 cursor-pointer hover:scale-110 w-5 h-5" onClick={() => handleDeleteProduct( product?._id)} />
    </div>
  );
};

export default EditProductDetails;
