import { db } from "@/util/dbConnection";
import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Posts",
  description: "Discover amazing hiking experiences.",
};

export default async function TrailsPage() {
  try {
    const trail = await db.query("SELECT * FROM trails");

    if (trail.error) {
      console.error("Error querying the database:", trails.error);
      return <div>Error fetching data.</div>;
    }

    console.log(trail);
    const wrangledTrail = trail.rows;
    console.log(wrangledTrail);
    return (
      <>
        <h1>Trails: </h1>
        <ul>
          {wrangledTrail.map((trail) => (
            <div key={trail.id}>
              <Link href={`/trails/${trail.name.replace(/ /g, "_")}`}>
                <>{trail.name}</>
              </Link>
              {/* <p>Location: {trail.location}</p>
              <p>Difficulty: {trail.difficulty}</p>
              <p>Description: {trail.description}</p> */}
            </div>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data from the database.</div>;
  }
}
