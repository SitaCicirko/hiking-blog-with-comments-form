import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Home",
  description: "Discover amazing hiking experiences.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
      <h1 className="text-4xl text-[#84b8ec] mb-6">
        Welcome to the Hiking Blog
      </h1>
      <p className="text-xl mb-6">Discover amazing hiking experiences.</p>

      <div className="flex gap-4">
        <Link
          href="/trails"
          className="p-4 text-xl bg-[#124e66] text-white rounded-md hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
        >
          View Trails
        </Link>
        <Link
          href="/new-trail"
          className="p-4 text-xl bg-[#124e66] text-white rounded-md hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
        >
          Add a New Trail
        </Link>
      </div>
    </div>
  );
}
