import { db } from "@/utils/dbConnection";
import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Comments",
  description: "Discover amazing hiking experiences.",
};
export default async function CommentsPage() {
  try {
    const comments = await db.query("SELECT * FROM comments");

    if (comments.error) {
      console.error("Error querying the database:", comments.error);
      return <div>Error fetching data.</div>;
    }

    console.log(comments);
    const wrangledComments = comments.rows;
    console.log(wrangledComments);
    return (
      <>
        <h1>Comments: </h1>
        <ul>
          {wrangledComments.map((comment) => (
            <div key={comment.id}>
              <Link href={`/comments/${comment.id}`}>
                <>{comment.content}</>
              </Link>
            </div>
          ))}
        </ul>
        <Link href={"/new-comment"}>Add a new comment</Link>
        <Link href={"/"}>Back to home</Link>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data from the database.</div>;
  }
}
