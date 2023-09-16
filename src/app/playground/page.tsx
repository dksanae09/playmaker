'use clien'

import CreatePlayground from "@/components/playground/createPlayground";
import DisplayPlayground from "@/components/playground/displayPlayground";

export default function PlayGround() {
    return (
        <div className="w-full grow h-fit flex flex-col justify-center min-h-[85vh]">
            <CreatePlayground />
            <DisplayPlayground />
        </div>
    )
}