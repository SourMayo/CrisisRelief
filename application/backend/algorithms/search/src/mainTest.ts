  import * as search from "./utils/search"

async function main() {
    console.log("Testing Search In Test Program");


    // Display all items in database
    console.log("Select All:");
    const location = await search.showAll();
    console.log(location);


    // Display resources with "place" it its name
    console.log("\nSimple Search Test:")
    
    // TODO: userInput should take in value from website
    let userInput:string = "place"

    const searchTest = await search.simpleSearch(userInput);
    console.log(searchTest);

}

main();