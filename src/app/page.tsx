import HeroImage from "@/components/heroImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="body-font">
      <CardContent className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
        <CardContent className="parent mb-10 w-1/2 p-0 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
          <HeroImage />
        </CardContent>
        <CardContent className="w-1/2 text-left">
          <CardHeader className="mb-4 font-mono text-3xl italic sm:text-4xl">
            Workflow that just works!
          </CardHeader>
          <CardDescription className="text-md mb-8 ml-5 w-full leading-relaxed">
            Discover the perfect ecosystem designed exclusively for YouTube
            creators and editors. Supercharge your content creation journey with
            <span className="ml-2 font-mono text-xl italic text-primary">
              playmaker
            </span>
            , where collaboration meets convenience. Communicate effortlessly,
            coordinate seamlessly, and edit videos with efficiency. Join us
            today and experience the future of YouTube content creation for
            free! <br />
            Create your First Playground!
            <Button variant="link">Go to Playgrounds!</Button>
          </CardDescription>
        </CardContent>
      </CardContent>
    </Card>
  );
}
