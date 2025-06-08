import Image from "next/image";
import Link from "next/link";

export const RecipeCard = ({recipe:{fields}}: any) => {
    const {title, slug, cookingTime, thumbnail} = fields;
    return(
        <div className="shadow-md p-6 rounded-lg rotate-1">
           <div className="featured">
            <Image src={'https:' + thumbnail.fields.file.url} alt="thumb" width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height}></Image>
           </div>
           <div className=" text-black text-2xl">
            <div className="info">
                <h4>{title}</h4>
                <p>Takes approx {cookingTime} mins to make</p>
            </div>
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                <Link href={'/recipes/' + slug}>Cook this</Link>
            </div>
           </div>
           {/* <style jsx>{`
            .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          
        }
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
        `}</style> */}
        </div>
    )
}