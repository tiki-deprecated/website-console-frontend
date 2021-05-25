
export default function authenticated(profile) {

 
    if (typeof window !== 'undefined') {
        const localProfile = window.localStorage.getItem('profile');
        if (!profile && !localProfile) {
            return false;
        } else {
            return true;
        }
    }
}