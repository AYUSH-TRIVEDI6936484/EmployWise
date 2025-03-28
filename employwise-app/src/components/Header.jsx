import LogoutButton from './LogoutButton';
import DarkModeToggle from './DarkModeToggle';

function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-2 bg-white dark:bg-gray-800 shadow-md mb-4">
            <h1 className="text-lg font-bold text-black dark:text-white">EmployWise</h1>
            <div className="flex items-center space-x-6">
                <DarkModeToggle />
                <LogoutButton />
            </div>
        </header>
    );
}

export default Header;
