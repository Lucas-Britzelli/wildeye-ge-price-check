import rs3itemDump from './data/rs3itemDump.json';

type Item = {
    id: number;
    name: string;
}

const allItems = Object.entries(rs3itemDump).map(([id, item]: [string, any]) => ({
    id: parseInt(id, 10),
    ...item,
  }));

export function getItemByName(name: string): Item | undefined {
    const lowerName = name.toLowerCase();
    return allItems.find((item: Item) => item.name.toLowerCase() === lowerName);
  }