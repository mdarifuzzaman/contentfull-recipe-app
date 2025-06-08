
import { RecipeCard } from '@/components/RecipeCard';
import {createClient } from 'contentful';

export async function getStaticProps(){
  const client = createClient({
    accessToken: process.env.API_TOKEN || '',
    space: process.env.SPACE_ID || ''
  });
  const res = await client.getEntries({ content_type: 'recipe'});
  return {
    props: {
      recipes: res.items
    }
  }
}

export default function Recipes({recipes}: any) {
  console.log("Recipe", recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe: any) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe}></RecipeCard>
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}