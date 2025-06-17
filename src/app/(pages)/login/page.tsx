import { signIn } from "@/lib/auth"

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        action={async () => {
          "use server"
          await signIn("discord", { redirectTo: "/lookup" })
        }}
        className="flex flex-col gap-4"
      >
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign in with Discord
        </button>
      </form>
    </div>
  )
}