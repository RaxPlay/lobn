"use client";

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/client';
import { signOutAction } from '@/app/api/auth';

export default function SignOutButton() {
	const router = useRouter();
	
	return (
		<button onClick={signOutAction} >		
			Sign-Out
		</button>
	)
}