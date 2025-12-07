import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

type Profile = { id: string; alt: string } | null;
type ProfileContextType = {
    profile: Profile;
    setProfile: (p: Profile) => void;
    clearProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfileState] = useState<Profile>(() => {
        const raw = typeof window !== "undefined" ? localStorage.getItem("selectedProfile") : null;
        return raw ? JSON.parse(raw) : null;
    });

    useEffect(() => {
        if (profile) localStorage.setItem("selectedProfile", JSON.stringify(profile));
        else localStorage.removeItem("selectedProfile");
    }, [profile]);

    // clearProfile também remove token e header Authorization
    function setProfile(p: Profile) {
        setProfileState(p);
    }
    function clearProfile() {
        setProfileState(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
        }
        delete api.defaults.headers.common["Authorization"];
    }

    return <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
    return ctx;
}