"use-client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const useAuth = () => {
    //necesito cachar el router y no hacer nada
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // State to ensure it's client-side

  useEffect(() => {
    // Ensure this code runs only on the client side (after mount)
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Check if it's client-side and then perform the token check
    if (isClient) {
      const token = localStorage.getItem('token');  // Or use cookies as needed

      if (!token) {
        // If no token exists, redirect to the login page
        router.push('/login');
      } 
    //   else {
    //     // If token exists, redirect to the profile page
    //     router.push('/cliente');
    //   }
    }
  }, [isClient, router]);

  return null;
};

export default useAuth;