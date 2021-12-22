import { useState } from "react";

export default function Counter() {

    const [count, setCount] = useState(5);

    setInterval(() => {
        setCount(count === 25 ? 5 : 25);
    }, 1000);

    return (
        <h1>{count}</h1>
    )
}
