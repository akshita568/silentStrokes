import useAuth from './useAuth';

const useAdmin = () => {
    // Check for both here as well
    const { user, loading, isLoading } = useAuth(); 

    if (loading || isLoading) return [false, true]; 

    // Forces lowercase just in case your phone/computer auto-capitalized your email on sign up
    const isAdmin = user?.email?.toLowerCase() === "sakshita222@gmail.com"; 

    return [isAdmin, false];
};

export default useAdmin;