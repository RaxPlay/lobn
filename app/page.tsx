import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSession();

  if(!session) redirect("/sign-in");

  else if(session) redirect("/access-board");
}
