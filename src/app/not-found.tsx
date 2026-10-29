import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FFF8F6] border border-[#FF6347]/20 text-[#FF6347] font-bold text-2xl flex items-center justify-center mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-[#64748B] max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved. Return to our homepage to explore digital products and services.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6347] hover:bg-[#E94B35] text-white font-semibold text-sm transition-colors shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
}
