import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - New Post",
  description: "Create a new post about your hiking experience.",
};

export default function NewTrailPage() {
  async function handleSubmit(formValues) {
    "use server";
    const name = formValues.get("name");
    const location = formValues.get("location");
    const difficulty = formValues.get("difficulty");
    const description = formValues.get("description");

    await db.query(
      "INSERT INTO trails (name, location, difficulty, description) VALUES ($1, $2, $3, $4)",
      [name, location, difficulty, description]
    );
    revalidatePath("/new-trail");

    redirect("/new-trail");
  }

  return (
    <>
      <h1>Add a new Trail!</h1>
      <form action={handleSubmit}>
        <label htmlFor="name">Trail name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Trail name"
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Location"
          required
        />

        <label htmlFor="difficulty">Difficulty:</label>
        <input
          type="text"
          id="difficulty"
          name="difficulty"
          placeholder="easy/moderate/hard"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
        />

        <button
          type="submit"
          className="border-amber-600 border-4 m-4 hover:bg-sky-700"
        >
          Submit
        </button>
      </form>
      <Link href="/trails">Back to trails</Link>
    </>
  );
}
