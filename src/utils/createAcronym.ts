export function createAcronym(name: string): string {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("")
}

//Reusable function to create an acronym for an item name
