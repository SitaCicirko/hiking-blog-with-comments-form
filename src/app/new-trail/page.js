import { db } from "@/utils/dbConnection";

export const metadata = {
  title: "Hiking Blog - New Post",
  description: "Create a new post about your hiking experience.",
};
q;
export default function NewTrailPage() {
  async function handleSubmit(formValues) {
    "use server";
    const name = formValues.get("name");
    const location = formValues.get("location");
    const difficulty = formValues.get("difficulty");
    const description = formValues.get("description");

    db.query(
      "INSERT INTO trails (name, location, difficulty, description) VALUES ($1, $2, $3, $4)",
      [name, location, difficulty, description]
    );
  }
}
return (
  <>
    <h1>Add a new Trail!</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Trail name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="trail name"
        required
        onChange={handleChangeFormValues}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        placeholder="location"
        required
        onChange={handleChangeFormValues}
      />

      <label htmlFor="difficulty">Difficulty:</label>
      <input
        type="text"
        id="difficulty"
        name="difficulty"
        placeholder="difficulty"
        required
        onChange={handleChangeFormValues}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="description"
        required
        onChange={handleChangeFormValues}
      />

      <button
        type="submit"
        className="border-amber-600 border-4 m-4 hover:bg-sky-700"
      >
        Submit
      </button>
    </form>
  </>
);
