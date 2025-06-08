
import {createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { Skeleton } from '@/components/Skaleton';

const client = createClient({
  accessToken: process.env.API_TOKEN || '',
  space: process.env.SPACE_ID || ''
});

export default function RecipeDetails({ recipe }: any) {
  if(!recipe) return <Skeleton></Skeleton>
  const {featuredImage, title, cookingTime, ingredients, method } = recipe.fields;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className="">
        <Image alt='details' 
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2 className='text-2xl'>{ title }</h2>
      </div>
      <div className="w-full text-2xl">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <div className="relative px-0">
        <p>Takes about { cookingTime } mins to cook.</p>
        <h3>Ingredients:</h3>

        {ingredients.map((ing: any) => (
          <span className="after:content-[','] last:after:content-['.']" key={ing}>{ ing }</span>
        ))}
      </div>
        
      

      {/* <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style> */}
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipe'});
  const paths = res.items.map((item: any) => {
    return { params: { slug: item.fields.slug} }
  });

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({content_type: 'recipe', 'fields.slug': params.slug});

  if(!items.length){
      return { 
        redirect : {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      recipe: items[0],
      revalidate: 100
    }
  }
}