import React from "react";

/**
 * Custom layout for /blocks/(blockId) routes.
 * Only wraps children in this segment.
 */
export default function BlockIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add any custom layout structure here:
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-10">
      {/* Custom header, nav, etc. */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Block Details</h1>
      </header>
      <main className="w-full max-w-3xl items-center ">{children}</main>
      {/* Custom footer, etc. */}
    </div>
  );
}
