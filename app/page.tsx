import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSession();

  if(!session) redirect("/sign-in");

  const userName = session.user.name

  if(session) redirect(`/home/${userName}`);
}
