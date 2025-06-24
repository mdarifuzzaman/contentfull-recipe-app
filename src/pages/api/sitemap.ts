import { createClient } from "contentful";
import { NextApiRequest, NextApiResponse } from "next";

const sitemapApi = async (req: NextApiRequest,
	res: NextApiResponse,): Promise<NextApiResponse | void> => {
    
    const client = createClient({
        accessToken: process.env.API_TOKEN || "",
        space: process.env.SPACE_ID || "",
        host: 'preview.contentful.com'
    });

    const response = await client.getEntries({
        content_type: 'recipe'
    });

    const publicUrl = process.env.PUBLIC_URL || '';

    const links = response.items
		.map((item) => {
			return `<url>
        		<loc>${publicUrl + item.fields?.slug}</loc>
                <priority>1</priority>
      		</url>`;
		})
		.join('');

	res.setHeader('Content-Type', 'text/xml;charset=utf-8');

	return res.send(`
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${links}</urlset>
  `);
}

export default sitemapApi;