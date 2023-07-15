import Link from "next/link";
const Index = () => {
  return (
    <nav className="bg-blue-600 flex gap-10 justify-center p-4">
      <Link
        href={"images"}
        className=" text-white font-medium hover:text-slate-400 transition-all duration-300 text-2xl"
      >
        Images
      </Link>
      <Link
        href={"predictions"}
        className=" text-white font-medium hover:text-slate-400 transition-all duration-300 text-2xl"
      >
        Predictions
      </Link>
    </nav>
  );
};

export default Index;
