"use client";

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/client';

export default function SignoutButton() {
	const router = useRouter();
	
	const signout = async() => await authClient.signOut({
		fetchOptions: {
			onSuccess: () => router.push("/sign-in")
		}
	})
	
	return (
		<button onClick={signout} >		
			Sign-Out
		</button>
	)
}