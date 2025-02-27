import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function PublicModel() {
  return (
    <div className="w-full bg-background p-6 md:p-8 lg:p-12">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group relative pt-0 overflow-hidden border-border/50 transition-all hover:border-primary/50">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src="https://res.cloudinary.com/drynqkitl/image/upload/v1740220285/Dp_oxgveh.jpg"
              alt="dahdao"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm"
            >
              Free
            </Badge>
          </div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CardTitle>Samay Raina</CardTitle>
            </div>
            <CardDescription className="mt-2">This is a trained model on samay raina&apos;s face</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              1 credit per Image
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Use Model
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
