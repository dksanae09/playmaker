import React, { useContext } from 'react'
import TimeLine from '../timeLine';
import { PlaygroundContext } from '@/context/playgroundContextProvider';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"

export default function PlaygroundOverview() {
    const { userId, playground } = useContext(PlaygroundContext);
    const role = userId === playground?.owner ? 'owner' : 'editor';

    return (
        <Card>
            <CardHeader>Title Here!</CardHeader>
            <CardContent>Descp - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam autem corporis dolorum magni dolor fugit adipisci recusandae aut praesentium voluptate hic, sint voluptates ipsum. Facere quidem explicabo beatae porro libero.</CardContent>
            <Separator />
            <CardHeader>Timeline</CardHeader>
            <CardContent>Timeline - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</CardContent>
            <TimeLine role={role} />
        </Card>
    )
}
