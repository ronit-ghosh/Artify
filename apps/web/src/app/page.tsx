import Dashboard from "@/components/Dashboard"

export default async function page() {
  console.log("Huya?", process.env.NEXT_PUBLIC_MY)
  return <Dashboard />
}
