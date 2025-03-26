import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  console.log('checando middleware')

  if (request.nextUrl.pathname === "/") {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();

  
    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const {
        data: { profile },
      } = await supabase.from("user_info").select().eq("user_id", user.id).single();

      const cookieStore = await cookies()
      
      console.log('criando cookie')
      cookieStore.set({
        name: 'user',
        value: user.id,
        httpOnly: true,
        sameSite: 'strict'
      })

      console.log(`user: ${cookieStore.get('user')}`)
    
      if (profile === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      if (profile === "user") {
        return NextResponse.redirect(new URL("/home", request.url));
      }

    return NextResponse.redirect(new URL('/unauthorized', request.url))
  } 

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
