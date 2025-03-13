"use-client";
import AuthCheck from '../components/AuthCheck';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <AuthCheck />
    </div>
  );
};

export default HomePage;