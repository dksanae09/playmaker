'use client'

import React, { useContext, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import encryptText, { decryptText } from '@/utils/encryptdecrpyt';
import { Button } from '@/components/ui/button';
import { PlaygroundContext } from '@/context/playgroundContextProvider';

export default function TimeLine({ isOwner }: { isOwner: boolean }) {
    const { playground } = useContext(PlaygroundContext);
    const [tasks, setTasks] = useState([{
        name: 'event 1',
        description: encryptText('description'),
        deadline: new Date(12),
    }]);

    const addTask = () => {
        console.log('add event')
    }

    return (
        <Card>
            <CardContent>
                {
                    tasks.map((task, index) => {
                        return (
                            <CardContent key={index}>
                                {task.name}
                                {decryptText(task.description)}
                                {task.deadline.toISOString()}
                            </CardContent>
                        )
                    })
                }
            </CardContent>
            <CardContent>
                <Button disabled={!isOwner} onClick={addTask}>Add Task</Button>
            </CardContent>
        </Card>
    )
}
