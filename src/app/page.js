import Link from "next/link";

export const metadata = {
  title: "Hiking Blog - Home",
  description: "Discover amazing hiking experiences.",
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Hiking Blog</h1>
      <p>Discover amazing hiking experiences.</p>
      <Link href="/trails">View trails</Link>
      <Link href="/new-trail">Add a new trail</Link>
    </div>
  );
}
