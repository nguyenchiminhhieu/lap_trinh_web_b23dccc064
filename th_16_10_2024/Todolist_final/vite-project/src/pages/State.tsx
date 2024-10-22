import { Button } from '@/components/ui/button';
import { useState } from 'react';

const State = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(c => c + 1)
    }

    return (
        <div className='p-2 flex flex-col gap-2'>
            <h1 className='text-white'>You clicked {count} times</h1>
            <Button onClick={handleIncrement} className='w-fit bg-white text-base hover:bg-white/90'>Click me</Button>
        </div>
    );
};

export default State;