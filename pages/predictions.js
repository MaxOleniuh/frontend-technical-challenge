import Link from "next/link";
const Predictions = () => {
  return (
    <>
      <div>Predictions</div>
      <Link href={"/"} className="text-red-800 text-2xl font-semibold p-1">
        Back
      </Link>
    </>
  );
};

export default Predictions;
