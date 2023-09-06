import { CollectionCardStyle2 } from "@/components/CollectionCard";
import Link from "next/link";

const TopCollection = () => {
  return (
    <div className="container my-10">
      <h3 className="text-xl mb-4 font-bold">Top Collection</h3>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
        {[...Array(4)].map((x, i) => (
          <Link key={x?.id} href="#">
            <CollectionCardStyle2 />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCollection;
