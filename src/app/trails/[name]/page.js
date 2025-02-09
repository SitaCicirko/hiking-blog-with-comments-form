import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Trail Details",
  description: "Discover amazing hiking experiences.",
};

export default async function TrailPage({ params }) {
  const trailName = decodeURIComponent(await params.name.replace(/_/g, " "));
  console.log("Fetching trail:", trailName);

  try {
    const trailQuery = await db.query("SELECT * FROM trails WHERE name = $1", [
      trailName,
    ]);

    if (trailQuery.rows.length === 0) {
      return <h1>Trail not found</h1>;
    }

    const trail = trailQuery.rows[0];
    const trailId = trail.id;
    console.log("Trail ID:", trailId);

    const commentsQuery = await db.query(
      "SELECT * FROM comments WHERE trail_id = $1",
      [trailId]
    );
    const comments = commentsQuery.rows;

    console.log("Comments:", comments);

    async function handleSubmit(formValues) {
      "use server";
      const username = formValues.get("username");
      const content = formValues.get("content");

      await db.query(
        "INSERT INTO comments (trail_id, username, content) VALUES ($1, $2, $3)",
        [trailId, username, content]
      );

      revalidatePath(`/trails/${params.name}`);
      redirect(`/trails/${params.name}`);
    }

    return (
      <>
        <h1>{trail.name}</h1>
        <p>Location: {trail.location}</p>
        <p>Difficulty: {trail.difficulty}</p>
        <p>Description: {trail.description}</p>

        <h2>Comments:</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.username}:</strong> {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <h2>Add a Comment:</h2>
        <form action={handleSubmit}>
          <label htmlFor="username">Your Name:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="content">Comment:</label>
          <textarea id="content" name="content" required />

          <button type="submit">Submit</button>
        </form>

        <Link href="/trails">Back to Trails</Link>
        <Link href="/">Back to Home</Link>
      </>
    );
  } catch (error) {
    console.error("Error fetching trail data:", error);
    return <h1>Error loading trail data</h1>;
  }
}
