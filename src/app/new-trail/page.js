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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
      <h1 className="text-4xl text-[#84b8ec] mb-6">Add a New Trail!</h1>
      <form
        action={handleSubmit}
        className="w-full max-w-3xl space-y-6 bg-[#3b4b57] p-8 rounded-lg"
      >
        <div className="flex flex-col space-y-6">
          <label htmlFor="name" className="text-xl">
            Trail name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Trail name"
            required
            className="p-4 bg-[#2e3b3d] text-[#d3d9d4] rounded-md w-full"
          />

          <label htmlFor="location" className="text-xl">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            required
            className="p-4 bg-[#2e3b3d] text-[#d3d9d4] rounded-md w-full"
          />

          <label htmlFor="difficulty" className="text-xl">
            Difficulty:
          </label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            placeholder="easy/moderate/hard"
            required
            className="p-4 bg-[#2e3b3d] text-[#d3d9d4] rounded-md w-full"
          />

          <label htmlFor="description" className="text-xl">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            required
            className="p-4 bg-[#2e3b3d] text-[#d3d9d4] rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-6 p-4 bg-[#124e66] text-white rounded-md hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300 w-full"
        >
          Submit
        </button>
      </form>

      <div className="mt-6 flex gap-4">
        <Link
          href="/trails"
          className="p-4 text-xl bg-[#124e66] text-white rounded-md hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
        >
          Back to Trails
        </Link>
        <Link
          href="/"
          className="p-4 text-xl bg-[#124e66] text-white rounded-md hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
