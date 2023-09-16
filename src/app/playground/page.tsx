import CreatePlayground from "@/components/playground/createPlayground";
import DisplayPlayground from "@/components/playground/displayPlayground";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PlayGround() {
    return (
        <Card>
            <CardHeader className="text-4xl">PlayGround</CardHeader>
            <CardContent>
                <CreatePlayground />
                <DisplayPlayground />
            </CardContent>
        </Card>
    )
}