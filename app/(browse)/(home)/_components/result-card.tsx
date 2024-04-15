import Link from "next/link";
import { Stream, User } from "@prisma/client";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface ResultCardProps {
    data: {
      user?: {
        id: string;
        username: string;
        imageUrl: string;
        externalUserId: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
      isLive: boolean;
      name: string;
      thumbnailUrl: string | null;
    };
  }
  

  export const ResultCard = ({ data }: ResultCardProps) => {
    return (
      <Link href={data.user ? `/${data.user.username}` : "#"}>
        <div className="h-full w-full space-y-4">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user ? data.user.imageUrl : ""}
            isLive={data.isLive}
            username={data.user ? data.user.username : ""}
          />
          <div className="flex gap-x-3">
            {data.user && (
              <UserAvatar
                username={data.user.username}
                imageUrl={data.user.imageUrl}
                isLive={data.isLive}
              />
            )}
            <div className="flex flex-col text-sm overflow-hidden">
              <p className="truncate font-semibold hover:text-blue-500">
                {data.name}
              </p>
              {data.user && (
                <p className="text-muted-foreground">
                  {data.user.username}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>
    </div>
  );
};