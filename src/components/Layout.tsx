import Link from "next/link";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white text-center py-4">
        <Link href="/" legacyBehavior>
          <a>
            <h1>
              <span>Stories</span>
            </h1>
            <h2>Great stories</h2>
          </a>
        </Link>
      </header>

      <div className="flex-grow container mx-auto p-4">{children}</div>

      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-3">
        <p>Copyright @ Test</p>
      </footer>
    </div>
  );
}
