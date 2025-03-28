import { logout } from "../utils/auth";

function LogoutButton() {
    return (
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
