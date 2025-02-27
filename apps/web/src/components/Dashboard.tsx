import SavePrompt from "./SavePrompt";
import UserDetails from "./UserDetails";


export default async function Dashboard() {

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <UserDetails />
      <SavePrompt />
    </div>
  );
}