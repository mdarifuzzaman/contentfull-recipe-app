import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { Skeleton } from "@/components/Skaleton";

const client = createClient({
  accessToken: process.env.API_TOKEN || "",
  space: process.env.SPACE_ID || "",
});

export default function StoryDetails({ story }: any) {
  if (!story) return <Skeleton></Skeleton>;
  const { featuredImage, title, readingTime, topics, method } =
    story.item?.fields;
  const { items } = story.relatedItems;
  console.log("Item", items);
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="">
          <Image
            alt="details"
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
          />
          <h2 className="text-2xl">{title}</h2>
        </div>
        <div className="w-full text-2xl">
          <h3>Method:</h3>
          <div>{documentToReactComponents(method)}</div>
        </div>

        <div className="relative px-0">
          <p>Takes about {readingTime} mins to read.</p>
          <h3>Topics:</h3>

          {topics.map((ing: any) => (
            <span
              className="after:content-[','] last:after:content-['.']"
              key={ing}
            >
              {ing}
            </span>
          ))}
        </div>
          <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Related story Images</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items?.map((item: any, index: number) => (
            <div className="w-full" key={index}>
              <Image
                src={"https:" + item?.fields?.file?.url}
                 width={item?.fields?.file?.details?.image?.width}
                height={item?.fields?.file?.details?.image?.height}
                alt="Related Recipe"
                className="rounded-lg w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
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
  );
}

// export const getStaticPaths = async () => {
//   const res = await client.getEntries({ content_type: 'recipe'});
//   const paths = res.items.map((item: any) => {
//     return { params: { slug: item.fields.slug} }
//   });

//   return {
//     paths,
//     fallback: true
//   }
// }

export async function getServerSideProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });
  let tags: any = [];
  items.forEach((item) => {
    const featureImage: any = item.fields["featuredImage"];
    tags = featureImage.metadata.tags;
    if (tags) {
      tags = tags.map((tg: any) => tg?.sys?.id);
    }
  });  

  if (tags.length > 0) {
    const relatedTags = await client.getAssets({
      "metadata.tags.sys.id[in]": tags,
    });
    tags = relatedTags;
  }

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      story: { item: items[0], relatedItems: tags },
    },
  };
}
