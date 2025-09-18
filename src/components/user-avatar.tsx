import React from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { cva, VariantProps } from 'class-variance-authority';

const avatarVariants = cva('', {
  variants: {
    size: {
      default: 'size-9',
      xs: 'size-4',
      sm: 'size-6',
      lg: 'size-10',
      xl: 'size-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

function UserAvatar({
  imageUrl,
  name,
  size,
  className,
  onClick,
}: Partial<UserAvatarProps>) {
  return (
    <Avatar
      className={avatarVariants({ size, className })}
      onClick={onClick}
    >
      <AvatarImage
        src={imageUrl}
        alt={name}
      />
    </Avatar>
  );
}

export default UserAvatar;
