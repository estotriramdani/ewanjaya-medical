import EJBooksNavbar from '@/components/ejbooks/EJBooksNavbar';
import EJBooksFooter from '@/components/ejbooks/EJBooksFooter';

export default function EJBooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EJBooksNavbar />
      <main className="relative overflow-hidden min-h-screen">{children}</main>
      <EJBooksFooter />
    </>
  );
}
