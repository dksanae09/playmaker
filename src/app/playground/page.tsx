import CreatePlayground from "@/components/playground/createPlayground";
import DisplayPlayground from "@/components/playground/displayPlayground";

export default function PlayGround() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <CreatePlayground />
            <DisplayPlayground />
        </div>
    )
}