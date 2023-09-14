'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export default function PlaygroundVideo() {
    const [value, setValue] = useState('');
    console.log(value)

    return (
        <div>
            Video here!
            <Input
                placeholder="Video"
                type='file'
                accept='video/*'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
