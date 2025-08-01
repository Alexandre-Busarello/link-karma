import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Portuguese (default) locale
  redirect('/pt');
}
