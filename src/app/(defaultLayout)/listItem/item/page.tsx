"use client";

import { useParams } from "next/navigation";
export default function ItemDetailPage() {
  const params = useParams();
  console.log(params, "params");
  return (
    <div className="container">
      <h1>Hello, ItemDetail Page!</h1>
    </div>
  );
}
