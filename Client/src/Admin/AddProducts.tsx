import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useAddProductMutation } from "../redux/feature/productManage/productApi";
import { uploadImageToCloudinary } from "../utils/CloudinaryUpload";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import CustomInputField from "../components/ui/CustomInputField";

// Zod Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().min(1, "Price cannot be 0."),
  quantity: z.number().min(1, "Quantity cannot be 0."),
  category: z.enum(["Pen", "Pencil", "Notebook", "Paper", "Protractor", "Eraser", "Sharpener", "Ruler", "Marker", "Glue"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  model: z.string().min(1, "Model is required."),
});

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: undefined,
      model: "",
    },
  });

  const { reset } = form;
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Selection
  const handleImageChange = (file: File) => {
    setImage(file);
  };

  // Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    setIsLoading(true);

    try {
      if (!image) {
        toast.error("Please select an image first!", { id: toastId });
        setIsLoading(false);
        return;
      }

      console.log("Uploading image to Cloudinary...");
      const imageUrl = await uploadImageToCloudinary(image);
      console.log("Image uploaded successfully. URL:", imageUrl);

      const productData = { ...data, image: imageUrl };
      console.log("Submitting form data to the backend...");

      const res = await addProduct(productData).unwrap(); // Use unwrap() for better error handling
      console.log("API Response:", res);

      toast.success("Product added successfully!", { id: toastId });
      reset();
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to add product. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Add New Product</h1>
      <div className="bg-black p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 text-white gap-6">
              <CustomInputField name="name" label="Product Name" placeholder="Enter Product name" type="text" control={form.control} />
              <CustomInputField name="model" label="Product Model" placeholder="Product Model..." type="text" control={form.control} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormLabel className="text-white">Product Image</FormLabel>
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])} className="w-full bg-black text-white" />
                {/* {!image && form.formState.isSubmitted && <p className="text-red-500">Product image is required.</p>} */}
                {image && (
                  <Button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="mt-2 bg-red-500 hover:bg-red-600 text-white">
                    Remove Image
                  </Button>
                )}
              </div>

              {/* Category Dropdown */}
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className="bg-black font-bold text-white">Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full bg-black text-white font-bold">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="font-bold">
                          {["Pen", "Pencil", "Notebook", "Paper", "Protractor", "Eraser", "Sharpener", "Ruler", "Marker", "Glue"].map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="bg-black text-white">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} className="text-lg w-full min-h-[100px] bg-black text-white" />
                </FormControl>
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-6">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel className="bg-black text-white">Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} className="text-lg w-full bg-black text-white" onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="quantity" render={({ field }) => (
                <FormItem>
                  <FormLabel className="bg-black text-white">Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} className="text-lg w-full bg-black text-white" onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <Button type="submit" className="w-full bg-white hover:bg-gray-100 text-black rounded-lg text-lg py-4 mt-6" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;