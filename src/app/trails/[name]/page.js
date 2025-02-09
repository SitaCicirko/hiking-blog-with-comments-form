import { db } from "@/util/dbConnection";
import Link from "next/link";

export default async function TrailsPage({ params }) {
  const trailParams = await params;

  const trailName = trailParams.name.replace(/_/g, " ");

  console.log("Fetching trail:", trailName);

  try {
    const trail = await db.query("SELECT * FROM trails WHERE name = $1", [
      trailName,
    ]);

    const wrangledTrail = trail.rows;

    console.log(wrangledTrail);

    return (
      <>
        {wrangledTrail.map((trail) => (
          <div key={trail.id}>
            <h1>Trail Name: {trail.name}</h1>
            <p>Location: {trail.location}</p>
            <p>Difficulty: {trail.difficulty}</p>
            <p>Description: {trail.description}</p>
          </div>
        ))}
        <Link href="/trails">Back to trails</Link>
      </>
    );
  } catch (error) {
    console.error("Error fetching trail data:", error);
    return <h1>Error loading trail data</h1>;
  }
}
