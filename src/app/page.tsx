export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-8 sm:p-20 font-sans">
      
      <section className="flex flex-col items-center justify-center flex-1 space-y-8 text-center animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Coming Soon
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        {/* Progress bar (subtiel visueel element) */}
        <div className="h-1 w-64 bg-neutral-800 rounded overflow-hidden">
          <div className="w-1/3 h-full bg-white animate-pulse" />
        </div>
      </section>

      <footer className="text-xs text-muted-foreground mt-12">
        © {new Date().getFullYear()} IkCheatNiet. All rights reserved.
      </footer>
    </main>
  );
}
