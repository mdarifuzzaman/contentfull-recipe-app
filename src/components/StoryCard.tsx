import Image from "next/image";
import Link from "next/link";

export const StoryCard = ({story:{fields, sys}}: any) => {
    const {title, slug, readingTime, thumbnail} = fields;
    return(
      // shadow-md p-6 rounded-lg rotate-1
        <div className="shadow-md p-6 rounded-lg"> 
           <div className="object-cover rounded-lg">
            <Image src={'https:' + thumbnail.fields.file.url} alt="thumb" width={300} height={200}></Image>
           </div>
           <div className=" text-black text-2xl">
            <div className="info">
                <h4>{title}</h4>
                <small>Takes approx {readingTime} mins to read</small>
                <div className="text-sm text-amber-800">Last Updated: {new Date(sys.updatedAt).toLocaleDateString()}</div>
            </div>
            <div className="inline-block px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                <Link href={'/stories/' + slug}>Read this</Link>
            </div>
           </div>           
        </div>
    )
}