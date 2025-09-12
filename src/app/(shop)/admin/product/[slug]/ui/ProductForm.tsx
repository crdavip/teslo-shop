"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Categories, Product, ProductImage, ValidGender } from "@/interfaces";
import { IoTrashOutline } from "react-icons/io5";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage as ProductImageComponent } from "@/components";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  categories: Categories[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  id: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string;
  title: string;
  categoryId: string;
  gender: ValidGender;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onChangeSize = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("tags", productToSave.tags);
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("sizes", productToSave.sizes.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    if (!ok) {
      alert("El producto no se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-10">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onChangeSize(size)}
                className={clsx(
                  "flex text-sm items-center cursor-pointer justify-center w-10 h-10 mr-4 border rounded-md hover:border-blue-400",
                  {
                    "bg-gray-200 border-gray-300  hover:text-blue-400": !getValues("sizes").includes(size),
                    "bg-blue-400 border-blue-400 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2 mt-3">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200 border-gray-300 focus:outline-0 focus:border-blue-500"
              accept="image/png, image/jpeg, image/avif"
              {...register("images")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            {product.ProductImage?.map((image) => (
              <div className="relative" key={image.id}>
                <ProductImageComponent
                  alt={product.title ?? ""}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded shadow-md"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger absolute right-2 top-2"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6">
          Guardar cambios
        </button>
      </div>
    </form>
  );
};
