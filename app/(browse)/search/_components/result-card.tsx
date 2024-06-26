import Link from "next/link";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";


interface ResultCardProps {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User | null; 
  };
}

export const ResultCard = ({
  data,
}: ResultCardProps) => {
  const renderUserDetails = () => {
    if (data.user) {
      return (
        <div className="flex items-center gap-x-2">
          <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
            {data.user.username}
          </p>
          <VerifiedMark />
        </div>
      );
    } else {
      return null;
    }
  };

  const userUsername = data.user?.username || '';

  return (
    <Link href={data.user ? `/${userUsername}` : '#'}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user ? data.user.imageUrl : ''}
            isLive={data.isLive}
            username={userUsername}
          />
        </div>
        <div className="space-y-1">
          {renderUserDetails()}
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};
  
export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};