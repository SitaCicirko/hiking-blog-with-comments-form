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
      <>
        <h1>Trails: </h1>
        <div>
          <h3>Sort By Name:</h3>
          <Link href="?sort=asc">A-Z</Link> | <Link href="?sort=desc">Z-A</Link>
        </div>
        <ul>
          {wrangledTrail.map((trail) => (
            <div key={trail.id}>
              <Link href={`/trails/${trail.name.replace(/ /g, "_")}`}>
                <>{trail.name}</>
              </Link>
            </div>
          ))}
        </ul>
        <Link href={"/new-trail"}>Add a new trail</Link>
        <Link href={"/"}>Back to home</Link>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data from the database.</div>;
  }
}
