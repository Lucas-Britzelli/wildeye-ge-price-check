import rs3itemDump from './data/rs3itemDump.json';
import {Item } from '@/types/item';



const allItems = Object.entries(rs3itemDump).map(([id, item]: [string, any]) => ({
    id: parseInt(id, 10),
    ...item,
  }));

export function getItemByName(name: string): Item | undefined {
    const lowerName = name.toLowerCase();
    return allItems.find((item: Item) => item.name.toLowerCase() === lowerName);
  }

export function getItemSuggestions(query: string): string[] {
    const lowerQuery = query.toLowerCase();
    return allItems
        .filter((item) => typeof item.name === 'string' && item.name.toLowerCase().includes(lowerQuery))
        .slice(0, 10) //Set it to an upper limit of 10 suggestions
}