import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function HeaderGreeting() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userCookie = cookieStore.get('user')?.value;
  const userInfo = user && userCookie ? JSON.parse(userCookie) : null;

  console.log('userCookie: ', userCookie);
  console.log('userInfo: ', userInfo);

  const userName = userInfo?.name?.split(' ')[0] ?? user?.email;

  return user ? (
    <div className="flex flex-col md:flex-row items-left justify-left gap-4">
      <span>
        Olá, <strong>{userName}!</strong>
      </span>
    </div>
  ) : null;
}
