import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Doc } from '../../convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function CardianBox({ playground }: { playground: Doc<"playgrounds"> }) {
    const { name, description, owner, editor } = playground;
    const ownerName = useQuery(api.users.get, { id: owner });
    const editorName = useQuery(api.users.get, { id: editor });

    return (
        <Card className='grid gap-2 w-[300px]'>
            <CardContent className='flex flex-col'>
                <CardHeader className='flex justify-start self-start p-0'>
                    <Button variant="link" className='flex justify-start p-0'>
                        <Link href={`/playground/${playground._id}`}>
                            {name}
                        </Link>
                    </Button>
                </CardHeader>
                <p>{description || "About this playground..."}</p>
            </CardContent>
        </Card >
    )
}
