import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";
import { SEO } from "../components/SEO";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[var(--pink-light)] via-white to-[var(--purple-light)]">
      <SEO
        fullTitle="Page Not Found | Cajee Botes"
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-semibold text-[var(--text-dark)] mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full px-8">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
