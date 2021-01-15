import React from 'react';
import { useHistory } from 'react-router-dom';

const LoadingRedirect = () => {
  const [count, setCount] = React.useState(7);
  const history = useHistory();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 700);
    count === 0 && history.push('/login');
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="loading--redirect">
      <p>Redirecting to login page in {count} seconds</p>
    </div>
  );
};

export default LoadingRedirect;
