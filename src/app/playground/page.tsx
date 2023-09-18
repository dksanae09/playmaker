import CreatePlayground from "@/components/playground/createPlayground";
import DisplayPlayground from "@/components/playground/displayPlayground";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PlayGround() {
  return (
    <Card>
      <CardHeader className="text-4xl">PlayGround</CardHeader>
      <CardContent className="flex flex-col items-center justify-between">
        <DisplayPlayground />
        <CreatePlayground />
      </CardContent>
    </Card>
  );
}
