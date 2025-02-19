import { CSSProperties } from "react";

export interface FeedListProps extends CSSProperties {
    data: Feed[];
    onMorePageClick: () => void;
    onMoreClick?: (id: Feed) => void;
    onLike: (id: string) => void;
    onRemoveLike: (id: string) => void;
    showSeeMore: boolean;
}

export type Feed = {
    causes_tags: string[];
    content: string;
    created_at: string;
    deleted_at: string;
    hashtags: string;
    id: string;
    identity_id: string;
    identity_meta: IdentityMeta;
    media: Media[];
    liked: boolean;
    likes: number;
    identity_type: 'organizations' | 'users';
}

export type IdentityMeta = {
    name: string;
    image: string;
    avatar: string;
    username: string;
    shortname?: string;
}

export type Media = {
    id: string;
    url: string;
}