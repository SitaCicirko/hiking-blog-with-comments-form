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

    async function deleteComment(formData) {
      "use server";
      const commentId = formData.get("commentId");

      await db.query("DELETE FROM comments WHERE id = $1", [commentId]);

      revalidatePath(`/trails/${params.name}`);
      redirect(`/trails/${params.name}`);
    }

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
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <div className="w-full max-w-2xl bg-[#3b4b57] p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl text-[#84b8ec] mb-4">{trail.name}</h1>
          <p className="text-lg">
            <span className="font-semibold">Location:</span> {trail.location}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Difficulty:</span>{" "}
            {trail.difficulty}
          </p>
          <p className="mt-4 text-xl text-gray-300">{trail.description}</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Comments:</h2>
        {comments.length > 0 ? (
          <ul className="w-full max-w-2xl space-y-6">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-[#3b4b57] p-6 rounded-lg relative transition-all duration-300 [#4a5a63]"
              >
                <div className="mb-4">
                  <strong className="text-[#84b8ec]">
                    {comment.username}:
                  </strong>{" "}
                  {comment.content}
                </div>

                <form
                  action={deleteComment}
                  className="absolute bottom-4 right-4"
                >
                  <input type="hidden" name="commentId" value={comment.id} />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No comments yet.</p>
        )}

        <h2 className="text-2xl font-semibold mt-6">Add a Comment:</h2>
        <form action={handleSubmit} className="mt-4 space-y-4 w-full max-w-2xl">
          <div>
            <label htmlFor="username" className="block font-medium">
              Your Name:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full p-2 bg-[#3b4b57] border border-gray-600 rounded"
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-medium">
              Comment:
            </label>
            <textarea
              id="content"
              name="content"
              required
              className="w-full p-2 bg-[#3b4b57] border border-gray-600 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-[#84b8ec] hover:bg-[#124e66] text-[#124e66] hover:text-white px-4 py-2 rounded transition duration-300"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 flex gap-4">
          <Link
            href="/trails"
            className="p-4 text-xl bg-[#124e66] text-white rounded hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
          >
            Back to Trails
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
    console.error("Error fetching trail data:", error);
    return <h1 className="text-red-500 text-3xl">Error loading trail data</h1>;
  }
}
