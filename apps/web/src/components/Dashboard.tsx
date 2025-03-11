import SavePrompt from "./SavePrompt";
import UserDetails from "./UserDetails";


export default async function Dashboard() {

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-8">
      
      <UserDetails />
      <SavePrompt />
    </div>
  );
}