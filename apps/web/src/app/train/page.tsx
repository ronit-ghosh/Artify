import TrainModelForm from "@/components/TrainModelForm";

export default function page() {
    return (
        <div className="w-full pt-4 grid place-items-center">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-semibold text-center mb-6">Enter Your Information</h1>
                <TrainModelForm />
            </div>
        </div>
    )
}