import Fuse from 'fuse.js';
import rs3itemDump from './data/rs3itemDump.json';
import {Item } from '@/types/item';
import { AbbreviationOverrideMaps } from './data/AbbreviationOverrides';
import { createAcronym } from './createAcronym';



const allItems: (Item & { acronym: string })[] = Object.entries(rs3itemDump).map(
  ([id, item]: [string, any]) => {
    const name = item.name || '';
    return {
      id: parseInt(id, 10),
      ...item,
      acronym: createAcronym(name),
    };
  }
);

export function getItemByName(query: string): Item | undefined {
    const lowerName = query.toLowerCase();
    const fullName = AbbreviationOverrideMaps[lowerName] || query;
    const nameToSearch = fullName ?? query;
    return allItems.find((item: Item) => item.name.toLowerCase() === lowerName);
  }

  const fuse = new Fuse(allItems, {
    keys: ['name', 'acronym'],
    threshold: 0.3,
  })

export function getItemSuggestions(query: string): string[] {
    const lowerQuery = query.toLowerCase();

    if (AbbreviationOverrideMaps[lowerQuery]) {
        return [AbbreviationOverrideMaps[lowerQuery]];
    }

    const results = fuse.search(lowerQuery).slice(0, 10);
    return results.map(result => result.item.name);
}

export function createFuse(items: Item[]): Fuse<Item> {
    const itemsWithAcronyms = items.map(item => ({
        ...item,
        acronym: item.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')
    }));

    return new Fuse(itemsWithAcronyms, {
        keys: ['name', 'acronym'],
        threshold: 0.3
    })
}