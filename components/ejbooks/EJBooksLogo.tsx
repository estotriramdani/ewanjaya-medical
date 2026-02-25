import Image from 'next/image';

interface EJBooksLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { img: 24, text: 'text-base font-bold' },
  md: { img: 32, text: 'bold-20' },
  lg: { img: 44, text: 'bold-32' },
};

const EJBooksLogo = ({ size = 'md', showText = true, className = '' }: EJBooksLogoProps) => {
  const s = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/img/ej-logo.png"
        alt="EJ Books Logo"
        width={s.img}
        height={s.img}
        className="flex-shrink-0"
      />
      {showText && <span className={`${s.text} text-gray-90`}>EJ Books</span>}
    </span>
  );
};

export default EJBooksLogo;
