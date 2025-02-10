import { db } from "@/utils/dbConnection";
import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Trails List",
  description: "Discover amazing hiking experiences.",
};

export default async function TrailsPage({ searchParams }) {
  try {
    const trail = await db.query("SELECT * FROM trails");

    if (trail.error) {
      console.error("Error querying the database:", trails.error);
      return <div>Error fetching data.</div>;
    }
    console.log(trail);

    const wrangledTrail = trail.rows;
    console.log(wrangledTrail);

    const query = await searchParams;
    console.log(query);

    if (query.sort === "desc") {
      wrangledTrail.sort((a, b) => b.name.localeCompare(a.name));
    } else if (query.sort === "asc") {
      wrangledTrail.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <h1 className="text-4xl text-[#84b8ec] mb-6">Trails</h1>
        <div className="mb-6 flex gap-4">
          <h3 className="text-lg">Sort By Name:</h3>
          <Link
            href="?sort=asc"
            className="text-[#124e66] p-2 bg-[#84b8ec] rounded hover:bg-[#124e66] hover:text-white transition duration-300"
          >
            A-Z
          </Link>
          <Link
            href="?sort=desc"
            className="text-[#124e66] p-2 bg-[#84b8ec] rounded hover:bg-[#124e66] hover:text-white transition duration-300"
          >
            Z-A
          </Link>
        </div>
        <ul className="w-full max-w-2xl space-y-6">
          {wrangledTrail.map((trail) => (
            <li
              key={trail.id}
              className="bg-[#3b4b57] p-6 rounded-lg hover:transform hover:scale-105 transition-transform"
            >
              <Link
                href={`/trails/${trail.name.replace(/ /g, "_")}`}
                className="text-white hover:text-[#124e66] text-center text-2xl"
              >
                {trail.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-4">
          <Link
            href="/new-trail"
            className="p-4 text-xl bg-[#124e66] text-white rounded hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
          >
            Add a new trail
          </Link>
          <Link
            href="/"
            className="p-4 text-xl bg-[#124e66] text-white rounded hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data from the database.</div>;
  }
}
