import { NextRequest } from 'next/server';
import { getItemByName } from '../../../utils/itemDump';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
  
    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
    }
  
    const item = getItemByName(query);
    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
    }
    try {
        const res = await fetch(`https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${item.id}`, {
            headers: {
                'User-Agent': 'WildEye-GE-Price-Checker/1.0 (contact: l.britzelli@gmail.com)',
            },
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch item details' }), {status: 500});
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("API ERROR:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch' }), {status: 500});
    }
}

