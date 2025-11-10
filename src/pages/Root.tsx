import { useProfile } from "../contexts/ProfileContext";
import Home from "./Home";
import Perfis from "./Perfis";

export default function Root() {
    const { profile } = useProfile();
    return profile ? <Home /> : <Perfis />;
}