import { useEffect, useState } from 'react';

const timeToString = (time: number) => time.toString().padStart(2, '0');

export const CountdownTimer = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const timeRemaining = +midnight - +now;

      const h = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const s = Math.floor((timeRemaining / 1000) % 60);

      setHours(timeToString(h));
      setMinutes(timeToString(m));
      setSeconds(timeToString(s));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="font-bold text-sm md:text-2xl">
      <p className="mb-4">До кінця акції:</p>
      <ul className="grid grid-cols-3 rounded-md p-4 bg-[#F4F3FD]">
        <li className="flex flex-col items-center relative after:content-[':'] after:absolute after:-right-1">
          <span>{hours}</span>
          <span>годин</span>
        </li>
        <li className="flex flex-col items-center relative after:content-[':'] after:absolute after:-right-1">
          <span>{minutes}</span>
          <span>хвилин</span>
        </li>
        <li className="flex flex-col items-center">
          <span>{seconds}</span>
          <span>секунд</span>
        </li>
      </ul>
    </div>
  );
};
