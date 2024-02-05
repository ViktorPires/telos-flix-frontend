import { Profile } from "../../components/Profile";
import Header from "../../components/header";
export default function Person() {
    return (
        <div data-testid="person-component">
            <Header />
            <Profile />
        </div>
    )
}

