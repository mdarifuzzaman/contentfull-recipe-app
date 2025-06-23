
import Pagination from '@/components/Pagination';
import { StoryCard } from '@/components/StoryCard';
import {ContentfulClientApi, createClient } from 'contentful';

export async function getPaginatedRecipes(page = 1, pageSize = 10, client: ContentfulClientApi<undefined>) {
  const skip = (page - 1) * pageSize;

  const response = await client.getEntries({
    content_type: 'recipe',
    skip: skip,
    limit: pageSize
  });

  return {
    items: response.items,
    total: response.total,       // total number of entries
    skip: response.skip,         // how many skipped
    limit: response.limit,       // how many fetched
  };
}

export async function getServerSideProps(context: any){  

  

const client = createClient({
    accessToken: process.env.API_TOKEN || '',
    space: process.env.SPACE_ID || ''
  });

  const page = parseInt(context.query.page || '1');
  const res = await getPaginatedRecipes(page, 6, client)
  return {
    props: {
      stories: res.items,
      total: res.total,
      skip: res.skip,
      limit: res.limit      
    }
  }
}

export default function Stories({stories, total, limit, skip}: any) { 
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stories.map((story: any) => (
          <StoryCard key={story.sys.id} story={story}></StoryCard>
        ))}      
        
      </div>
            {/* Pagination at Bottom */}
        <div>
          <Pagination currentPage={1} totalPages={total/6} />
        </div>
    </div>
  )
}