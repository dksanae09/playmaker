import React, { useContext } from 'react'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import TimeLine from '../timeLine';
import { PlaygroundContext } from '@/context/playgroundContextProvider';

export default function PlaygroundOverview() {
    const { userId, playground } = useContext(PlaygroundContext);
    const role = userId === playground?.owner ? 'owner' : 'editor';

    return (
        <div>
            <h2>Title Here!</h2>
            <p>Descp - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam autem corporis dolorum magni dolor fugit adipisci recusandae aut praesentium voluptate hic, sint voluptates ipsum. Facere quidem explicabo beatae porro libero.</p>
            <h3>Timeline</h3>
            <p>Timeline - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            {role}
            <TimeLine role={role} />
        </div>
    )
}
