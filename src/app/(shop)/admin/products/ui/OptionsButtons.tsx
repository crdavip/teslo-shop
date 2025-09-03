"use client";

import { redirect } from "next/navigation";
import { IoBuildOutline, IoTrashOutline } from "react-icons/io5";
import { deleteProduct } from "@/actions";

interface Props {
  slugProduct: string;
  idProduct: string;
}

export const OptionsButtons = ({ slugProduct, idProduct }: Props) => {
  const onEditProduct = (slug: string) => {
    redirect(`/admin/product/${slug}`);
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => onEditProduct(slugProduct)} className="btn-info-alt">
        <IoBuildOutline size={20} />
      </button>
      <button type="button" onClick={() => deleteProduct(idProduct)} className="btn-danger-alt">
        <IoTrashOutline size={20} />
      </button>
    </div>
  );
};
