import { cn } from '../../utils/cn';

export default function Avatar({
  src,
  alt,
  initials,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium',
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="text-sm">{initials}</span>
      )}
    </div>
  );
}