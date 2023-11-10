import React from 'react';
import { BlogPost } from '../types';
import PostListPost from './PostList/post-list-post';
import PostListAdSpace from './PostList/post-list-adspace';

interface Props {
  posts: BlogPost[];
  startIndex: number;
}

const PostList: React.FC<Props> = ({ posts, startIndex }) => {
  return (
    <div className="flex w-full">
      <div className="w-full border-r-1.5 border-zinc-700 md:w-3/4 lg:w-3/5">
        <div className="divide-y-1.5 divide-zinc-700 bg-secondary">
          {posts.length &&
            posts.slice(startIndex).map((post) => <PostListPost post={post} />)}
        </div>
      </div>
      <div className="hidden border-r-1.5 border-zinc-700  bg-secondary md:flex md:w-1/4 lg:w-2/5">
        <PostListAdSpace />
      </div>
    </div>
  );
};

export default PostList;
