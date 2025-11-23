import React, { createContext, useContext, useEffect, useState } from "react";

type Profile = { id: number; alt: string } | null;
type ProfileContextType = {
    profile: Profile;
    setProfile: (p: Profile) => void;
    clearProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfileState] = useState<Profile>(() => {
        const raw = localStorage.getItem("selectedProfile");
        return raw ? JSON.parse(raw) : null;
    });

    useEffect(() => {
        if (profile) localStorage.setItem("selectedProfile", JSON.stringify(profile));
        else localStorage.removeItem("selectedProfile");
    }, [profile]);

    function setProfile(p: Profile) {
        setProfileState(p);
    }
    function clearProfile() {
        setProfileState(null);
    }

    return (
        <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
    return ctx;
}